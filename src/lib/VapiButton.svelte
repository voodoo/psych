<script lang="ts">
  import { env } from '$env/dynamic/public';
  import { initVapi, startCall, stopCall } from './VapiClient';

  const publicKey = env.PUBLIC_VAPI_KEY;
  const assistantId = env.PUBLIC_VAPI_ASSISTANT_ID;

  let isRunning = false;
  let status: string = 'Ready.';

  async function ensureMicPermission() {
    if (!navigator?.mediaDevices?.getUserMedia) {
      throw new Error('This browser does not support microphone access (getUserMedia).');
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    for (const track of stream.getTracks()) track.stop();
  }

  async function toggleCall() {
    if (!publicKey || !assistantId) {
      status = 'Voice not configured yet (missing PUBLIC_VAPI_KEY / PUBLIC_VAPI_ASSISTANT_ID).';
      return;
    }

    try {
      if (!isRunning) {
        status = 'Requesting microphone permission…';
        await ensureMicPermission();

        status = 'Starting call…';
        initVapi(publicKey);
        await startCall(assistantId);
        isRunning = true;
        status = 'Listening…';
      } else {
        status = 'Stopping…';
        await stopCall();
        isRunning = false;
        status = 'Stopped.';
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('Start/stop error:', err);
      status = `Error: ${msg}`;
      isRunning = false;
    }
  }
</script>

<div class="vapi-panel">
  <h2>Vapi Voice</h2>
  <button type="button" on:click={toggleCall} class={isRunning ? 'running' : 'idle'}>
    {isRunning ? '🔴 Stop' : '🎤 Start'}
  </button>
  <div class="status" aria-live="polite">{status}</div>
</div>

<style>
  .vapi-panel {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 40px;
    border: 2px solid var(--border-color);
    border-radius: 16px;
    background: var(--bg-secondary);
    backdrop-filter: blur(10px);
    box-shadow: 0 0 40px var(--glow-color), inset 0 0 40px rgba(255, 0, 110, 0.05);
    min-width: 280px;
    transition: all 0.3s ease;
  }
  
  h2 {
    margin: 0;
    text-align: center;
    font-size: 1.8rem;
    background: linear-gradient(90deg, var(--accent-cyan), var(--accent-pink));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 3px;
  }
  
  button {
    padding: 24px;
    border: 3px solid;
    border-radius: 12px;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 2px;
    box-shadow: 0 0 20px var(--glow-color);
  }
  
  button.idle {
    background: linear-gradient(135deg, var(--accent-cyan), #0099cc);
    color: var(--bg-primary);
    border-color: var(--accent-cyan);
  }
  
  button.idle:hover {
    background: linear-gradient(135deg, #00ffff, #0099cc);
    box-shadow: 0 0 40px var(--glow-color), 0 0 20px rgba(0, 255, 255, 0.6);
    transform: scale(1.05);
  }
  
  button.running {
    background: linear-gradient(135deg, var(--accent-pink), #ff3333);
    color: white;
    border-color: var(--accent-pink);
    animation: pulse 1s infinite;
  }
  
  button.running:hover {
    box-shadow: 0 0 40px rgba(255, 0, 110, 0.8), 0 0 20px rgba(255, 51, 51, 0.6);
    transform: scale(1.05);
  }
  
  @keyframes pulse {
    0%, 100% {
      box-shadow: 0 0 20px rgba(255, 0, 110, 0.5);
    }
    50% {
      box-shadow: 0 0 40px rgba(255, 0, 110, 0.8);
    }
  }
  
  .status {
    font-size: 14px;
    line-height: 1.3;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid var(--border-color);
    background: var(--bg-tertiary);
    color: var(--text-primary);
    word-break: break-word;
    transition: all 0.3s ease;
  }
</style>
