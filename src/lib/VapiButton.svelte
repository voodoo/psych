<script lang="ts">
  const status =
    'Voice is temporarily disabled for deployment. We will re-enable Vapi after Netlify is live.';
</script>

<div class="vapi-panel">
  <h2>Vapi Voice</h2>
  <button type="button" class="idle" disabled>🎤 Start</button>
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
    border: 3px solid #00d9ff;
    border-radius: 12px;
    font-size: 24px;
    font-weight: bold;
    cursor: not-allowed;
    text-transform: uppercase;
    letter-spacing: 2px;
    background: linear-gradient(135deg, #00d9ff, #0099cc);
    color: #0a0e27;
    opacity: 0.7;
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
