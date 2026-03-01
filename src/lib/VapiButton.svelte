<script lang="ts">
  import { PUBLIC_VAPI_KEY, PUBLIC_VAPI_ASSISTANT_ID } from '$env/static/public';
  import { initVapi, startCall, stopCall } from './VapiClient';

  const publicKey = PUBLIC_VAPI_KEY;
  const assistantId = PUBLIC_VAPI_ASSISTANT_ID;

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
    status = `Clicked @ ${new Date().toLocaleTimeString()}`;
    console.log('VapiButton clicked');

    if (!publicKey || !assistantId) {
      status = 'Missing Vapi credentials. Add PUBLIC_VAPI_KEY and PUBLIC_VAPI_ASSISTANT_ID to .env';
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

  <button
    type="button"
    on:click={toggleCall}
    class={isRunning ? 'running' : 'idle'}
  >
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
    border: 2px solid #00d9ff;
    border-radius: 16px;
    background: rgba(10, 14, 39, 0.8);
    backdrop-filter: blur(10px);
    box-shadow: 0 0 40px rgba(0, 217, 255, 0.3), inset 0 0 40px rgba(255, 0, 110, 0.05);
    min-width: 280px;
  }

  h2 {
    margin: 0;
    text-align: center;
    font-size: 1.8rem;
    background: linear-gradient(90deg, #00d9ff, #ff006e);
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
    box-shadow: 0 0 20px rgba(0, 217, 255, 0.3);
  }

  button.idle {
    background: linear-gradient(135deg, #00d9ff, #0099cc);
    color: #0a0e27;
    border-color: #00d9ff;
  }

  button.running {
    background: linear-gradient(135deg, #ff006e, #ff3333);
    color: white;
    border-color: #ff006e;
  }

  .status {
    font-size: 14px;
    line-height: 1.3;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(0, 0, 0, 0.25);
    color: #eaeaea;
    word-break: break-word;
  }
</style>
