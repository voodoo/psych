<script>
  import VapiButton from '../lib/VapiButton.svelte';
  import ConversationDisplay from '../lib/ConversationDisplay.svelte';
</script>

<svelte:head>
  <title>Psych</title>
</svelte:head>

<div class="container">
  <header>
    <h1>🎙️ PSYCH</h1>
    <p>Voice-powered conversation</p>
  </header>

  <main>
    <div class="chat-area">
      <ConversationDisplay />
      <VapiButton />
    </div>
  </main>

  <footer>
    <p>Powered by Vapi.ai</p>
  </footer>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background: #0a0e27;
    color: #e0e0e0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    overflow-x: hidden;
  }

  .container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: linear-gradient(135deg, #0a0e27 0%, #1a1f4a 100%);
  }

  header {
    text-align: center;
    margin-top: 20px;
  }

  h1 {
    font-size: 3rem;
    margin: 0;
    background: linear-gradient(90deg, #00d9ff, #ff006e, #00d9ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-transform: uppercase;
    letter-spacing: 8px;
    font-weight: 900;
    animation: glow 3s ease-in-out infinite;
  }

  header p {
    font-size: 1rem;
    color: #00d9ff;
    margin: 8px 0 0 0;
    font-weight: 300;
    letter-spacing: 2px;
  }

  main {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 800px;
    margin: 40px 20px;
  }

  .chat-area {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }

  footer {
    text-align: center;
    padding: 20px;
    color: #666;
    font-size: 0.9rem;
  }

  @keyframes glow {
    0%, 100% {
      text-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
    }
    50% {
      text-shadow: 0 0 30px rgba(255, 0, 110, 0.8), 0 0 60px rgba(0, 217, 255, 0.6);
    }
  }
</style>
