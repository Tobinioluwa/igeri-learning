import { AgeTier, Language, Message } from './types';

// Offline/fallback response pools, used only when the real Claude backend
// (netlify/functions/chat.ts) is unreachable or not configured — see
// generateAIResponse below. Kept intentionally small: this is a safety net,
// not the primary experience.
const RESPONSES: Record<Language, Record<AgeTier, { greeting: string[]; homework_guard: string[]; encouragement: string[] }>> = {
  English: {
    '5-8': {
      greeting: [
        "Hello my friend! I'm Igeri. What shall we learn today? 🌟",
        "Well done! You are doing great. Want to talk about animals or numbers? 🦁",
        "Hi! I'm so happy to see you! Ready for some fun learning? 🌿"
      ],
      homework_guard: [
        "Oh, that looks like school work! I won't give you the answer, but let's try together. If we have 5 oranges and give away 2, how many are left? 🍊",
        "I see you're working hard! Igeri doesn't do the homework, but I can help you think! What's the first step? 🤔"
      ],
      encouragement: [
        "You sabi this! Keep going! 👏",
        "Oya, you're almost there! Try one more time! ✨",
        "Correct! You be star! ⭐"
      ],
    },
    '9-13': {
      greeting: [
        "Welcome back! Ready to explore the Nigerian curriculum? 📚",
        "Hello! I'm your learning companion. What subject are we tackling today?",
        "Great to see you again. Let's make some progress on your studies! 🚀"
      ],
      homework_guard: [
        "I see you're working on something interesting! Instead of giving the answer, I'll help you figure it out. What part of this topic feels tricky? 💡",
        "Good question! To solve this, we should think about the formula first. Do you remember which one we use for this? 📐"
      ],
      encouragement: [
        "Great thinking! You're building strong brains. 🧠",
        "That's a smart way to look at it! Let's dive deeper.",
        "Well done! Your explanation is very clear. 🌟"
      ],
    },
    '14-17': {
      greeting: [
        "Hello. Ready for some deep analysis today? 🚀",
        "Welcome. I'm here to support your studies and career guidance. What's on your mind?",
        "Good day. Let's focus on mastering those complex concepts today. 🎓"
      ],
      homework_guard: [
        "That's a challenging problem. I can guide you through the principles behind it so you can master it yourself. Where should we start the analysis? 🔍",
        "To help you with this, let's break down the requirements. What is the core principle being tested here? 📝"
      ],
      encouragement: [
        "Excellent reasoning. You're developing critical skills. 🎓",
        "Your approach is solid. Let's refine the final steps together.",
        "I'm impressed by your analytical approach. Keep it up! 📈"
      ],
    }
  },

  Pidgin: {
    '5-8': {
      greeting: [
        "A-low my friend! I be Igeri. Wetin we go learn today? 🌟",
        "You try well-well! You want make we talk about animals or numbers? 🦁",
        "How far! I happy well-well say you come. Make we learn! 🌿"
      ],
      homework_guard: [
        "Eh-hen, this one be like school work! I no go give you the answer, but make we try am together. Wetin you think first? 🤔",
        "I see say you dey work! Igeri no dey do homework for person, but I go help you think am! 💡"
      ],
      encouragement: [
        "You sabi this one! No stop! 👏",
        "Oya, you almost finish am! Try again! ✨",
        "You too set! Correct! ⭐"
      ],
    },
    '9-13': {
      greeting: [
        "How far! You ready to tackle school work today? 📚",
        "Wel-done! Which subject we go handle now? 🚀"
      ],
      homework_guard: [
        "This one senior me small, but I go help you figure am out. Wetin be the first thing you suppose do? 💡",
        "Make we reason am together. If you do this part first, wetin go happen next? 📐"
      ],
      encouragement: [
        "You be confirm brain! 🧠",
        "That one makes sense well-well. Make we continue! 🌟"
      ]
    },
    '14-17': {
      greeting: [
        "How you dey? Ready to dive deep into your studies? 🎓",
        "Welcome. Wetin we dey treat today? 🚀"
      ],
      homework_guard: [
        "I see the problem. Make we break am down small-small so you go sabi am once and for all. 🔍",
        "No worry, we go solve am. But tell me first, wetin you think say be the main thing here? 📝"
      ],
      encouragement: [
        "Your head correct! 🎓",
        "You dey reason am well. Finish the remaining part now! 📈"
      ]
    }
  },

  Yoruba: {
    '5-8': {
      greeting: [
        "Ẹ n lẹ, ọ̀rẹ́ mi! Èmi ni Igeri. Kí ni a máa kọ́ẹ́kọ́ lónìí? 🌟",
        "Ó dára gan-an! Ǹjẹ́ a máa sọ̀rọ̀ nípa ẹranko tàbí àwọn nọ́mbà? 🦁"
      ],
      homework_guard: [
        "Ẹ jọ̀wọ́, èyí dà bí iṣẹ́ ilé-ìwé! Èmi kò ní fún ọ ní ìdáhùn, àmọ́ jẹ́ ká gbìyànjú papọ̀. Kí ni ìgbésẹ̀ àkọ́kọ́? 🤔"
      ],
      encouragement: [
        "O ṣe dáadáa gan! Máṣe dúró! 👏",
        "O fẹ́rẹ̀ dé! Gbìyànjú lẹ́ẹ̀kan sí i! ✨"
      ],
    },
    '9-13': {
      greeting: [
        "Ẹ kú àbọ̀! Ṣé o ti ṣetán láti kọ́ nípa ẹ̀kọ́ Nàìjíríà? 📚",
        "Báwo ni? Kí ni ẹ̀kọ́ tí a máa kọ́ lónìí? 🚀"
      ],
      homework_guard: [
        "Mo rí i pé o ń ṣiṣẹ́ lórí ohun kan tó fani mọ́ra! Kí ni apá tó le jù nínú rẹ̀? 💡"
      ],
      encouragement: [
        "Èrò rẹ dára! O ń kọ́ ọpọlọ tó lágbára. 🧠"
      ]
    },
    '14-17': {
      greeting: [
        "Ẹ kú àbọ̀. Ṣé o ti ṣetán fún àyẹ̀wò tó jinlẹ̀ lónìí? 🚀"
      ],
      homework_guard: [
        "Ìṣòro yìí le díẹ̀, àmọ́ jẹ́ ká fọ́ ọ palẹ̀ papọ̀ kí o lè yé ọ pátápátá. 🔍"
      ],
      encouragement: [
        "Èrò rẹ dára gan-an. Jẹ́ ká parí àwọn ìgbésẹ̀ tó kù papọ̀. 🎓"
      ]
    }
  },

  Igbo: {
    '5-8': {
      greeting: [
        "Kedu, enyi m! Abụ m Igeri. Gịnị ka anyị ga-amụ taa? 🌟",
        "I mere nke ọma! Ị chọrọ ka anyị kwuo banyere anụmanụ ma ọ bụ ọnụọgụgụ? 🦁"
      ],
      homework_guard: [
        "Nke a yiri ọrụ ụlọ akwụkwọ! Agaghị m enye gị azịza, ma ka anyị nwaa ọnụ. Gịnị bụ nzọụkwụ mbụ? 🤔"
      ],
      encouragement: [
        "Ị maara nke a! Gaa n'ihu! 👏",
        "Ị fọrọ nke nta! Nwaa ọzọ! ✨"
      ],
    },
    '9-13': {
      greeting: [
        "Nnọọ! Ị dị njikere ịmụ banyere usoro agụmakwụkwọ Naijiria? 📚",
        "Kedụ ka ị mere? Kedụ ngalaba anyị ga-alele taa? 🚀"
      ],
      homework_guard: [
        "Ahụrụ m na ị na-arụ ọrụ na ihe na-adọrọ mmasị! Kedụ akụkụ isi ike? 💡"
      ],
      encouragement: [
        "Echiche gị dị mma! Ị na-ewulite ụbụrụ dị ike. 🧠"
      ]
    },
    '14-17': {
      greeting: [
        "Nnọọ. Ị dị njikere maka nyocha miri emi taa? 🚀"
      ],
      homework_guard: [
        "Nsogbu a siri ike, ma ka anyị kụọ ya ntakịrị ka ị ghọta ya kpamkpam. 🔍"
      ],
      encouragement: [
        "Nzube gị dị mma. Ka anyị mechaa nzọụkwụ ndị fọdụrụ. 🎓"
      ]
    }
  },

  Hausa: {
    '5-8': {
      greeting: [
        "Sannu, abokina! Ni ne Igeri. Me za mu koya yau? 🌟",
        "Kayi kyau ƙwarai! Kana son mu tattauna dabbobi ko lambobi? 🦁"
      ],
      homework_guard: [
        "Wannan yayi kama da aikin makaranta! Ba zan baka amsa ba, amma bari mu gwada tare. Mece ce mataki na farko? 🤔"
      ],
      encouragement: [
        "Ka sani wannan! Ci gaba! 👏",
        "Kaje kusa! Sake gwadawa! ✨"
      ],
    },
    '9-13': {
      greeting: [
        "Barka da zuwa! A shirye kake ka bincika tsarin karatun Najeriya? 📚",
        "Yaya kake? Wane fanni za mu duba yau? 🚀"
      ],
      homework_guard: [
        "Na ga kana aiki akan wani abu mai ban sha'awa! Wane sashi ne mafi wahala? 💡"
      ],
      encouragement: [
        "Tunanin ka yayi kyau! Kana gina kwakwalwa mai ƙarfi. 🧠"
      ]
    },
    '14-17': {
      greeting: [
        "Barka da zuwa. A shirye kake domin zurfin bincike a yau? 🚀"
      ],
      homework_guard: [
        "Wannan matsala tana da wahala, amma bari mu rarraba ta kadan-kadan domin ka fahince ta sosai. 🔍"
      ],
      encouragement: [
        "Hanyar da kake bi tayi kyau. Bari mu gama sauran matakan tare. 🎓"
      ]
    }
  },
};

const THANK_YOU: Record<Language, string> = {
  English: "You're very welcome! I'm always here to help you learn. 🌿",
  Pidgin: "No wahala! I dey for you always. 🌿",
  Yoruba: "Kò tọ́pá! Mo wà níbí fún ọ nígbà gbogbo. 🌿",
  Igbo: "Ọ dị mma! Anọ m ebe a mgbe niile maka gị. 🌿",
  Hausa: "Babu komai! Ina nan koyaushe don ka. 🌿",
};

const LISTENING: Record<Language, string> = {
  English: "Tell me more! I'm listening. 👂",
  Pidgin: "Tell me more now! I dey listen. 👂",
  Yoruba: "Sọ síi fún mi! Mo ń fetí sí ọ. 👂",
  Igbo: "Gwa m ọzọ! Ana m ege ntị. 👂",
  Hausa: "Faɗa mini ƙarin! Ina saurare. 👂",
};

export const generateAIResponse = async (
  input: string,
  tier: AgeTier,
  language: Language = 'English'
): Promise<string> => {
  // Fallback mock logic — used only when the real AI backend is unavailable.
  const lowerInput = input.toLowerCase();

  const homeworkKeywords = [
    '?', 'what is', 'solve', 'calculate', 'find', 'homework', 'assignment', 'answer',
    'result', 'how much', 'tell me the answer', 'do my work'
  ];

  const isHomework = homeworkKeywords.some(keyword => lowerInput.includes(keyword)) || lowerInput.match(/\d+ \s*[+\-*/]\s* \d+/);

  const pool = RESPONSES[language][tier];

  if (isHomework) {
    const guards = pool.homework_guard;
    return guards[Math.floor(Math.random() * guards.length)];
  }

  if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('how far') || lowerInput.includes('kedu') || lowerInput.includes('sannu') || lowerInput.includes('bawo')) {
    const greetings = pool.greeting;
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  if (lowerInput.includes('thank')) {
    return THANK_YOU[language];
  }

  if (lowerInput.length < 5) {
    return LISTENING[language];
  }

  const encouragements = pool.encouragement;
  return `${encouragements[Math.floor(Math.random() * encouragements.length)]} Can you tell me more about what you're thinking? In ${tier === '5-8' ? 'Buba' : tier === '9-13' ? 'Kemi' : 'Chike'} mode, we always learn together!`;
};

const WELCOME: Record<Language, { subject: (s: string) => string; plain: (name: string) => string; placeholder: string }> = {
  English: {
    subject: (s) => `Hello! Let's dive into ${s}. What would you like to explore today? 🌟`,
    plain: (name) => `Hello ${name}! I'm Igeri, your learning companion. How can I help you today? 🌿`,
    placeholder: 'Ask me anything...',
  },
  Pidgin: {
    subject: (s) => `Oya! Make we start ${s} lessons. Wetin you want know? 🌟`,
    plain: (name) => `A-low ${name}! I be Igeri. Wetin we go learn today? 🌿`,
    placeholder: 'Wetin dey your mind?...',
  },
  Yoruba: {
    subject: (s) => `Ẹ n lẹ! Jẹ́ ká bẹ̀rẹ̀ ẹ̀kọ́ ${s}. Kí ni o fẹ́ mọ̀? 🌟`,
    plain: (name) => `Ẹ n lẹ, ${name}! Èmi ni Igeri, ọ̀rẹ́ ìkọ́ni rẹ. Báwo ni mo ṣe lè ràn ọ́ lọ́wọ́ lónìí? 🌿`,
    placeholder: 'Kí ni o fẹ́ béèrè?...',
  },
  Igbo: {
    subject: (s) => `Ndewo! Ka anyị malite ọmụmụ ihe ${s}. Kedụ ihe ị chọrọ ịmata? 🌟`,
    plain: (name) => `Ndewo ${name}! Abụ m Igeri, enyi gị ọmụmụ ihe. Kedụ ka m ga-esi nyere gị aka taa? 🌿`,
    placeholder: 'Kedụ ihe dị gị n\'obi?...',
  },
  Hausa: {
    subject: (s) => `Sannu! Bari mu fara darasin ${s}. Me kake son sani? 🌟`,
    plain: (name) => `Sannu ${name}! Ni ne Igeri, abokin karatunka. Yaya zan taimaka maka yau? 🌿`,
    placeholder: 'Me ke zuciyarka?...',
  },
};

export function getWelcomeMessage(language: Language, name: string, subject: string): string {
  const w = WELCOME[language];
  return subject !== 'General Learning' ? w.subject(subject) : w.plain(name);
}

export function getChatPlaceholder(language: Language): string {
  return WELCOME[language].placeholder;
}

// Real AI backend: calls the Netlify function (netlify/functions/chat.ts),
// which talks to the Claude API server-side. Falls back to the mock
// generateAIResponse above if the function isn't deployed/configured, or
// the request fails for any reason — the chat should never just break.
export const getIgeriResponse = async (
  input: string,
  tier: AgeTier,
  language: Language,
  subject: string,
  history: Message[]
): Promise<string> => {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: input,
        tier,
        language,
        subject,
        // Trim to recent context — keeps the request small and fast.
        history: history.slice(-10).map((m) => ({ role: m.role, content: m.content })),
      }),
    });

    if (!res.ok) throw new Error(`AI backend returned ${res.status}`);
    const data = await res.json();
    if (typeof data.reply !== 'string' || !data.reply.trim()) throw new Error('Empty AI response');
    return data.reply;
  } catch (err) {
    console.warn('Falling back to offline demo responses — the AI backend is not reachable:', err);
    return generateAIResponse(input, tier, language);
  }
};
