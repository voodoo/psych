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
    border: 2px solid #00d9ff;
    border-radius: 12px;
    padding: 20px;
    background: rgba(10, 14, 39, 0.6);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: inset 0 0 30px rgba(0, 217, 255, 0.1);
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
  }
  
  .message.user .content {
    background: linear-gradient(135deg, #00d9ff, #0099cc);
    color: #0a0e27;
    border: 1px solid #00d9ff;
    font-weight: 500;
  }
  
  .message.assistant .content {
    background: rgba(255, 0, 110, 0.1);
    border: 1px solid rgba(255, 0, 110, 0.5);
    color: #e0e0e0;
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
    background: rgba(0, 217, 255, 0.1);
    border-radius: 8px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 217, 255, 0.4);
    border-radius: 8px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 217, 255, 0.6);
  }
</style>
