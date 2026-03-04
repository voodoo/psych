<script lang="ts">
  import { sendMessage } from './OpenRouterClient';
  import { messages } from './VapiClient';
  
  let inputText = '';
  let isLoading = false;
  
  async function handleSubmit() {
    if (!inputText.trim() || isLoading) return;
    
    const userMessage = inputText.trim();
    inputText = '';
    isLoading = true;
    
    // Add user message to conversation
    messages.update(m => [...m, {
      role: 'user',
      content: userMessage,
      timestamp: Date.now()
    }]);
    
    try {
      // Get conversation history for context
      const history = $messages.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content
      }));
      
      // Send to OpenRouter
      const response = await sendMessage([...history, { role: 'user', content: userMessage }]);
      
      // Add AI response to conversation
      messages.update(m => [...m, {
        role: 'assistant',
        content: response,
        timestamp: Date.now()
      }]);
      
    } catch (error) {
      console.error('OpenRouter error:', error);
      messages.update(m => [...m, {
        role: 'assistant',
        content: 'Sorry, I had trouble responding. Please try again.',
        timestamp: Date.now()
      }]);
    } finally {
      isLoading = false;
    }
  }
  
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  }
</script>

<div class="text-input-panel">
  <div class="input-row">
    <input
      type="text"
      bind:value={inputText}
      on:keydown={handleKeydown}
      placeholder="Type a message..."
      disabled={isLoading}
    />
    <button on:click={handleSubmit} disabled={isLoading || !inputText.trim()}>
      {isLoading ? '...' : 'Send'}
    </button>
  </div>
</div>

<style>
  .text-input-panel {
    width: 100%;
  }
  
  .input-row {
    display: flex;
    gap: 12px;
    padding: 16px;
    border: 2px solid var(--border-color);
    border-radius: 12px;
    background: var(--bg-secondary);
    transition: all 0.3s ease;
  }
  
  input {
    flex: 1;
    padding: 12px 16px;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: 1rem;
    outline: none;
    transition: all 0.3s ease;
  }
  
  input:focus {
    box-shadow: 0 0 15px var(--glow-color);
  }
  
  input::placeholder {
    color: #666;
  }
  
  button {
    padding: 12px 24px;
    border: 2px solid var(--accent-cyan);
    border-radius: 8px;
    background: linear-gradient(135deg, var(--accent-cyan), #0099cc);
    color: var(--bg-primary);
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  button:hover:not(:disabled) {
    box-shadow: 0 0 20px var(--glow-color);
    transform: scale(1.02);
  }
  
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
