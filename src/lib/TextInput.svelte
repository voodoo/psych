<script>
  import { OpenRouterClient } from './OpenRouterClient';

  let inputText = '';
  let loading = false;
  let response = '';
  let error = '';

  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const client = apiKey ? new OpenRouterClient(apiKey) : null;

  async function handleSubmit() {
    if (!inputText.trim() || !client) return;

    loading = true;
    error = '';
    response = '';

    try {
      const result = await client.sendMessage(inputText);
      response = result;
      inputText = '';
    } catch (err) {
      error = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      loading = false;
    }
  }

  function handleKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }
</script>

<div class="text-input-container">
  <div class="input-group">
    <textarea
      bind:value={inputText}
      on:keydown={handleKeydown}
      placeholder="Type your message here..."
      disabled={loading}
    />
    <button
      on:click={handleSubmit}
      disabled={!inputText.trim() || loading}
      class="submit-btn"
    >
      {loading ? 'Processing...' : 'Send'}
    </button>
  </div>

  {#if response}
    <div class="response">
      <strong>AI Response:</strong>
      <p>{response}</p>
    </div>
  {/if}

  {#if error}
    <div class="error">
      <strong>Error:</strong>
      <p>{error}</p>
    </div>
  {/if}
</div>

<style>
  .text-input-container {
    padding: 20px;
    border-top: 2px solid var(--accent-cyan);
  }

  .input-group {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  textarea {
    flex: 1;
    padding: 12px;
    border: 1px solid var(--accent-cyan);
    border-radius: 8px;
    background: var(--bg-primary);
    color: var(--text-primary);
    font-family: inherit;
    font-size: 14px;
    resize: vertical;
    min-height: 60px;
    transition: all 0.3s ease;
  }

  textarea:focus {
    outline: none;
    border-color: var(--accent-pink);
    box-shadow: 0 0 10px rgba(0, 217, 255, 0.3);
  }

  textarea:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .submit-btn {
    padding: 12px 24px;
    background: var(--button-cyan-bg);
    color: var(--bg-primary);
    border: 2px solid var(--accent-cyan);
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
  }

  .submit-btn:hover:not(:disabled) {
    background: var(--button-cyan-hover);
    box-shadow: 0 0 20px rgba(0, 217, 255, 0.6);
  }

  .submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .response {
    padding: 15px;
    background: rgba(0, 217, 255, 0.1);
    border-left: 3px solid var(--accent-cyan);
    border-radius: 4px;
    color: var(--text-primary);
  }

  .error {
    padding: 15px;
    background: rgba(255, 0, 110, 0.1);
    border-left: 3px solid var(--accent-pink);
    border-radius: 4px;
    color: #ff6b6b;
  }
</style>
