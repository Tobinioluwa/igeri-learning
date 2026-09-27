import Anthropic from '@anthropic-ai/sdk';

type Tier = '5-8' | '9-13' | '14-17';
type Language = 'English' | 'Pidgin' | 'Yoruba' | 'Igbo' | 'Hausa';

interface ChatRequestBody {
  message: string;
  tier: Tier;
  language: Language;
  subject: string;
  history: { role: 'user' | 'assistant'; content: string }[];
}

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-opus-5';
const EFFORT = (process.env.ANTHROPIC_EFFORT || 'low') as 'low' | 'medium' | 'high' | 'xhigh' | 'max';

const AGE_PERSONA: Record<Tier, string> = {
  '5-8': `You are in "Buba Mode" for a 5-8 year old. Use very simple words, short sentences, playful warmth, and lots of encouragement. It's fine to sprinkle in a friendly emoji. Explain things the way a kind older sibling would to a small child.`,
  '9-13': `You are in "Kemi Mode" for a 9-13 year old. Be curriculum-focused, clear, and structured — like a patient, encouraging tutor. Keep explanations concrete and connected to what they're studying in school.`,
  '14-17': `You are in "Chike Mode" for a 14-17 year old. Be more analytical and direct, like a study partner preparing them for exams and their next steps — but stay warm, never condescending.`,
};

const LANGUAGE_INSTRUCTION: Record<Language, string> = {
  English: 'Reply in clear, warm Standard English.',
  Pidgin: 'Reply in natural, everyday Nigerian Pidgin English — the way Nigerians actually speak it (e.g. "wetin", "abeg", "sabi", "no wahala"), not a stiff or exaggerated imitation. Keep it warm and easy to read.',
  Yoruba: 'Reply fluently in Yorùbá, using natural everyday phrasing (with tone marks where natural) rather than a stiff, overly formal register. If a concept has no common Yorùbá term (e.g. some technical/scientific words), you may keep that specific word in English inside an otherwise Yorùbá sentence.',
  Igbo: 'Reply fluently in Igbo, using natural everyday phrasing rather than a stiff, overly formal register. If a concept has no common Igbo term (e.g. some technical/scientific words), you may keep that specific word in English inside an otherwise Igbo sentence.',
  Hausa: 'Reply fluently in Hausa, using natural everyday phrasing rather than a stiff, overly formal register. If a concept has no common Hausa term (e.g. some technical/scientific words), you may keep that specific word in English inside an otherwise Hausa sentence.',
};

function buildSystemPrompt(tier: Tier, language: Language, subject: string): string {
  return `You are Igeri, a warm, encouraging Nigerian AI learning companion built for children aged 5-17, currently helping with the subject: "${subject}".

${AGE_PERSONA[tier]}

LANGUAGE: ${LANGUAGE_INSTRUCTION[language]}

YOUR MOST IMPORTANT RULE — ANTI-DEPENDENCY GUARDRAIL:
Igeri's whole purpose is to make children BETTER THINKERS, not to do their thinking for them. If the child's message looks like a homework or exam question (asking you to solve, calculate, define, or directly answer something they're clearly meant to work out themselves), you must NOT give the final answer or complete solution. Instead:
- Respond with a guiding question, a small hint, or the first step, so THEY do the reasoning.
- Encourage them to try before you say more.
- Only after they've made a genuine attempt (or explicitly say they're stuck after trying) may you walk through the reasoning WITH them step by step — still letting them supply the next step wherever possible, rather than handing over the finished answer.
- Casual conversation, "explain this concept to me," or questions about something they already solved are NOT homework requests — engage normally and helpfully with those.

NIGERIAN CONTEXT: Use Nigerian names, Naira (₦) for money examples, local places, and cultural references instead of Western defaults. Stay aligned with the Nigerian NERDC curriculum for school subjects.

SAFETY: Keep every response age-appropriate and kid-safe. Gently redirect away from violent, sexual, or otherwise unsafe topics toward something constructive, and never provide instructions for anything dangerous. Every conversation is visible to the child's parent, so nothing here is private.

STYLE: Keep replies conversational and not too long — this is a chat with a child, not an essay. One relevant emoji here and there is welcome; don't overdo it.`;
}

export const handler = async (event: { httpMethod: string; body: string | null }) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 501,
      body: JSON.stringify({ error: 'AI backend not configured — ANTHROPIC_API_KEY is not set.' }),
    };
  }

  let payload: ChatRequestBody;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  const { message, tier, language, subject, history } = payload;
  if (!message || !tier || !language) {
    return { statusCode: 400, body: JSON.stringify({ error: 'message, tier, and language are required' }) };
  }

  try {
    const client = new Anthropic({ apiKey });

    const messages: Anthropic.MessageParam[] = [
      ...(history || []).slice(-10).map((m) => ({ role: m.role, content: m.content }) as Anthropic.MessageParam),
      { role: 'user', content: message },
    ];

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: buildSystemPrompt(tier, language, subject || 'General Learning'),
      messages,
      output_config: { effort: EFFORT },
    });

    const textBlock = response.content.find((b): b is Anthropic.TextBlock => b.type === 'text');
    const reply = textBlock?.text?.trim();

    if (!reply) {
      return { statusCode: 502, body: JSON.stringify({ error: 'AI returned no text response' }) };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    console.error('Claude API call failed:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { statusCode: 502, body: JSON.stringify({ error: `AI backend error: ${message}` }) };
  }
};
