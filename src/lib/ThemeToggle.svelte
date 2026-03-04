<script lang="ts">
  import { onMount } from 'svelte';

  let isDark = true;

  onMount(() => {
    const saved = localStorage.getItem('psych_theme');
    if (saved) {
      isDark = saved === 'dark';
    } else {
      isDark = !window.matchMedia('(prefers-color-scheme: light)').matches;
    }
    updateTheme();
  });

  function toggleTheme() {
    isDark = !isDark;
    updateTheme();
    localStorage.setItem('psych_theme', isDark ? 'dark' : 'light');
  }

  function updateTheme() {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }
</script>

<button type="button" class="theme-toggle" on:click={toggleTheme} aria-label="Toggle theme">
  {isDark ? '🌙' : '☀️'}
</button>

<style>
  .theme-toggle {
    position: fixed;
    top: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px solid var(--border-color);
    background: var(--bg-secondary);
    cursor: pointer;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 0 20px var(--glow-color);
  }

  .theme-toggle:hover {
    transform: scale(1.1);
    box-shadow: 0 0 30px var(--glow-color);
  }
</style>
