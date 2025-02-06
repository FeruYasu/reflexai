export const botResponses = {
  greeting: [
    'Hey, is this support? I need some help here.',
    'Uh, hi. Not sure if I’m in the right place, but I’ve got a question.',
    'Hello? Hope you can help me out with something.',
  ],
  goodbye: [
    'Alright, thanks for the help. I’ll see if this works.',
    'Cool, I appreciate it. Talk to you later!',
    'Alright, I gotta go. Hope this doesn’t break again.',
  ],
  query: [
    'So, I’ve got this issue... what am I supposed to do here?',
    'Okay, quick question—how does this thing even work?',
    "I keep trying to fix this, but nothing's working. Any ideas?",
  ],
  confirmation: [
    'Oh, okay, got it. That makes sense.',
    'Alright, I think I follow. Let’s see if this works.',
    'Okay, I’ll give that a shot. Fingers crossed.',
  ],
  gratitude: [
    'Oh, thanks! I really appreciate it.',
    'Yeah, that helps a lot. Thanks again!',
    'Nice, thanks for clearing that up!',
  ],
  complaint: [
    'Look, I’ve been trying for an hour, and this is still broken.',
    'This is super frustrating. Why is this happening?',
    'Honestly, this shouldn’t be this complicated...',
  ],
  fallback: [
    'Uh... I’m not sure what you mean. Can you explain?',
    'Wait, that didn’t really answer my question.',
    'Huh? That doesn’t sound like what I asked...',
  ],
};

export function determineResponseType(
  input: string
): keyof typeof botResponses {
  const lowercaseInput = input.toLowerCase();

  if (/\b(hi|hello|hey|greetings)\b/.test(lowercaseInput)) {
    return 'greeting';
  }

  if (/\b(bye|goodbye|see you|later|farewell)\b/.test(lowercaseInput)) {
    return 'goodbye';
  }

  if (
    lowercaseInput.includes('?') ||
    /\b(what|how|why|when|where|can|could|go|help)\b/.test(lowercaseInput)
  ) {
    return 'query';
  }

  if (/\b(yes|ok|okay|sure|right|got it)\b/.test(lowercaseInput)) {
    return 'confirmation';
  }

  if (/\b(thank you|thanks|appreciate|grateful)\b/.test(lowercaseInput)) {
    return 'gratitude';
  }

  if (
    /\b(not working|error|bug|issue|problem|doesn’t work|won’t work|bad)\b/.test(
      lowercaseInput
    )
  ) {
    return 'complaint';
  }

  return 'fallback';
}
