import { botResponses } from "./answers";

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
