<script lang="ts">
  import { initVapi, startCall, stopCall } from './VapiClient';
  
  const publicKey = import.meta.env.PUBLIC_VAPI_KEY;
  const assistantId = import.meta.env.PUBLIC_VAPI_ASSISTANT_ID;
  
  let isRunning = false;
  
  async function toggleCall() {
    try {
      if (!isRunning) {
        initVapi(publicKey);
        await startCall(assistantId);
        isRunning = true;
      } else {
        await stopCall();
        isRunning = false;
      }
    } catch (err) {
      console.error('Error:', err);
      alert(String(err));
    }
  }
</script>

<div class="vapi-panel">
  <h2>Vapi Voice</h2>
  
  <button
    on:click={toggleCall}
    class={isRunning ? 'running' : 'idle'}
  >
    {isRunning ? '🔴 Stop' : '🎤 Start'}
  </button>
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
  
  button.idle:hover {
    background: linear-gradient(135deg, #00ffff, #0099cc);
    box-shadow: 0 0 40px rgba(0, 217, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.6);
    transform: scale(1.05);
  }
  
  button.running {
    background: linear-gradient(135deg, #ff006e, #ff3333);
    color: white;
    border-color: #ff006e;
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
</style>
