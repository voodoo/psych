import Vapi from '@vapi-ai/web';
import { writable } from 'svelte/store';

let vapi: Vapi | null = null;

export const messages = writable<Array<{ role: string; content: string; timestamp: number }>>([]);

export function initVapi(publicKey: string) {
  vapi = new Vapi({
    publicKey,
  });
  
  vapi.on('call-start', () => {
    console.log('Call started');
    messages.set([]);
  });
  
  vapi.on('call-end', () => {
    console.log('Call ended');
  });
  
  vapi.on('message', (msg: any) => {
    console.log('Vapi message:', msg);
    
    if (msg.type === 'user-transcribed') {
      messages.update(m => [...m, {
        role: 'user',
        content: msg.transcription || msg.transcript || '',
        timestamp: Date.now()
      }]);
    } else if (msg.type === 'assistant-message') {
      messages.update(m => [...m, {
        role: 'assistant',
        content: msg.message || '',
        timestamp: Date.now()
      }]);
    } else if (msg.transcription) {
      messages.update(m => [...m, {
        role: 'user',
        content: msg.transcription,
        timestamp: Date.now()
      }]);
    }
  });
  
  return vapi;
}

export function getVapi() {
  return vapi;
}

export async function startCall(assistantId: string) {
  if (!vapi) throw new Error('Vapi not initialized');
  await vapi.start(assistantId);
}

export async function stopCall() {
  if (!vapi) throw new Error('Vapi not initialized');
  await vapi.stop();
}
