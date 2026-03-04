import { env } from '$env/dynamic/public';

const OPENROUTER_API_KEY = env.PUBLIC_OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function sendMessage(messages: Message[]): Promise<string> {
  if (!OPENROUTER_API_KEY) {
    throw new Error('Missing PUBLIC_OPENROUTER_API_KEY in environment');
  }

  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://psych.app',
      'X-Title': 'Psych Voice AI'
    },
    body: JSON.stringify({
      model: 'openrouter/auto',
      messages: messages
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter error: ${error}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'No response';
}
