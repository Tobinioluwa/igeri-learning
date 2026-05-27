import { AgeTier } from './types';

const RESPONSES = {
  '5-8': {
    greeting: [
      "Hello my friend! I'm Igeri. What shall we learn today? 🌟", 
      "Well done! You are doing great. Want to talk about animals or numbers? 🦁",
      "Kedu! I'm so happy to see you! Ready for some fun learning? 🌿"
    ],
    homework_guard: [
      "Oh, that looks like school work! I won't give you the answer, but let's try together. If we have 5 oranges and give away 2, how many are left? 🍊",
      "I see you're working hard! Igera doesn't do the homework, but I can help you think! What's the first step? 🤔"
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
};

const PIDGIN_RESPONSES = {
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
};

export const generateAIResponse = async (
  input: string, 
  tier: AgeTier, 
  language: 'English' | 'Pidgin' = 'English'
): Promise<string> => {
  // Enhanced mock logic for the prototype
  const lowerInput = input.toLowerCase();
  
  // Homework detection keywords
  const homeworkKeywords = [
    '?', 'what is', 'solve', 'calculate', 'find', 'homework', 'assignment', 'answer',
    'result', 'how much', 'tell me the answer', 'do my work'
  ];
  
  const isHomework = homeworkKeywords.some(keyword => lowerInput.includes(keyword)) || lowerInput.match(/\d+ \s*[\+\-\*\/]\s* \d+/);
  
  const pool = (language === 'Pidgin') ? PIDGIN_RESPONSES[tier] : RESPONSES[tier];
  
  // Logic for different scenarios
  if (isHomework) {
    const guards = pool.homework_guard;
    return guards[Math.floor(Math.random() * guards.length)];
  }
  
  if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('how far') || lowerInput.includes('kedu')) {
    const greetings = pool.greeting;
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  if (lowerInput.includes('thank') || lowerInput.includes('thanks')) {
    return language === 'Pidgin' ? "No wahala! I dey for you always. 🌿" : "You're very welcome! I'm always here to help you learn. 🌿";
  }

  if (lowerInput.length < 5) {
     return language === 'Pidgin' ? "Tell me more now! I dey listen. 👂" : "Tell me more! I'm listening. 👂";
  }
  
  const encouragements = pool.encouragement;
  return `${encouragements[Math.floor(Math.random() * encouragements.length)]} Can you tell me more about what you're thinking? In ${tier === '5-8' ? 'Buba' : tier === '9-13' ? 'Kemi' : 'Chike'} mode, we always learn together!`;
};