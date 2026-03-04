<script>
  import VapiButton from '../lib/VapiButton.svelte';
  import ConversationDisplay from '../lib/ConversationDisplay.svelte';
  import ThemeToggle from '../lib/ThemeToggle.svelte';
  import TextInput from '../lib/TextInput.svelte';
</script>

<svelte:head>
  <title>Psych</title>
</svelte:head>

<ThemeToggle />

<div class="container">
  <header>
    <h1>🎙️ PSYCH</h1>
    <p>Voice-powered conversation</p>
  </header>

  <main>
    <div class="chat-area">
      <ConversationDisplay />
      <VapiButton />
      <TextInput />
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
    background: var(--bg-primary);
    color: var(--text-primary);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    overflow-x: hidden;
    transition: background 0.3s ease, color 0.3s ease;
  }

  :global(html) {
    --bg-primary: #0a0e27;
    --bg-secondary: #1a1f4a;
    --bg-tertiary: rgba(10, 14, 39, 0.6);
    --text-primary: #e0e0e0;
    --accent-cyan: #00d9ff;
    --accent-pink: #ff006e;
    --border-color: #00d9ff;
    --glow-color: rgba(0, 217, 255, 0.3);
  }

  :global([data-theme="light"]) {
    --bg-primary: #f5f5f5;
    --bg-secondary: #ffffff;
    --bg-tertiary: rgba(255, 255, 255, 0.8);
    --text-primary: #1a1a1a;
    --accent-cyan: #0099cc;
    --accent-pink: #cc0066;
    --border-color: #0099cc;
    --glow-color: rgba(0, 153, 204, 0.2);
  }

  .container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
    transition: background 0.3s ease;
  }

  header {
    text-align: center;
    margin-top: 20px;
  }

  h1 {
    font-size: 3rem;
    margin: 0;
    background: linear-gradient(90deg, var(--accent-cyan), var(--accent-pink), var(--accent-cyan));
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
    color: var(--accent-cyan);
    margin: 8px 0 0 0;
    font-weight: 300;
    letter-spacing: 2px;
    transition: color 0.3s ease;
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
      text-shadow: 0 0 10px var(--glow-color);
    }
    50% {
      text-shadow: 0 0 30px rgba(255, 0, 110, 0.8), 0 0 60px var(--glow-color);
    }
  }
</style>
