<script lang="ts">
  import { messages } from './VapiClient';
  
  let scrollContainer: HTMLDivElement;
  
  $: if (scrollContainer) {
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
  }
</script>

<div class="conversation" bind:this={scrollContainer}>
  {#if $messages.length === 0}
    <div class="empty">
      <p>🎤 Start talking...</p>
    </div>
  {:else}
    {#each $messages as msg, i (i)}
      <div class="message {msg.role}">
        <div class="badge">{msg.role === 'user' ? '👤' : '🤖'}</div>
        <div class="content">
          <p>{msg.content}</p>
        </div>
      </div>
    {/each}
  {/if}
</div>

<style>
  .conversation {
    width: 100%;
    height: 400px;
    overflow-y: auto;
    border: 2px solid var(--border-color);
    border-radius: 12px;
    padding: 20px;
    background: var(--bg-tertiary);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: inset 0 0 30px var(--glow-color);
    transition: all 0.3s ease;
  }
  
  .empty {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    font-size: 1.1rem;
    text-align: center;
  }
  
  .message {
    display: flex;
    gap: 12px;
    animation: slideIn 0.3s ease;
  }
  
  .message.user {
    justify-content: flex-end;
  }
  
  .message.assistant {
    justify-content: flex-start;
  }
  
  .badge {
    font-size: 1.4rem;
    flex-shrink: 0;
  }
  
  .content {
    max-width: 70%;
    padding: 12px 16px;
    border-radius: 8px;
    word-wrap: break-word;
    transition: all 0.3s ease;
  }
  
  .message.user .content {
    background: linear-gradient(135deg, var(--accent-cyan), #0099cc);
    color: var(--bg-primary);
    border: 1px solid var(--accent-cyan);
    font-weight: 500;
  }
  
  .message.assistant .content {
    background: var(--message-assistant-bg);
    border: 1px solid var(--message-assistant-border);
    color: var(--text-primary);
  }
  
  .content p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.4;
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: var(--glow-color);
    border-radius: 8px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 217, 255, 0.4);
    border-radius: 8px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: var(--accent-cyan);
  }
</style>
