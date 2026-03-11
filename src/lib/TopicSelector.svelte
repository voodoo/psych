<script lang="ts">
  import { TOPICS } from './topics';

  export let selectedTopic: string | null = null;

  function selectTopic(topicId: string) {
    selectedTopic = topicId;
  }
</script>

<div class="topic-selector">
  <h2>Choose a Topic</h2>
  <div class="topics-grid">
    {#each TOPICS as topic (topic.id)}
      <button
        class="topic-button"
        class:active={selectedTopic === topic.id}
        on:click={() => selectTopic(topic.id)}
      >
        <div class="emoji">{topic.emoji}</div>
        <div class="name">{topic.name}</div>
        <div class="description">{topic.description}</div>
      </button>
    {/each}
  </div>
</div>

<style>
  .topic-selector {
    width: 100%;
    margin-bottom: 30px;
  }

  h2 {
    text-align: center;
    color: var(--accent-cyan);
    margin-bottom: 20px;
    font-size: 1.2rem;
    letter-spacing: 1px;
  }

  .topics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    width: 100%;
  }

  .topic-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 20px;
    background: var(--bg-secondary);
    border: 2px solid var(--border-color);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: var(--text-primary);
    font-family: inherit;
  }

  .topic-button:hover {
    background: var(--bg-tertiary);
    box-shadow: 0 0 20px var(--glow-color);
    transform: translateY(-2px);
  }

  .topic-button.active {
    background: var(--accent-cyan);
    color: var(--bg-primary);
    box-shadow: 0 0 30px var(--accent-cyan);
  }

  .emoji {
    font-size: 2rem;
  }

  .name {
    font-weight: 600;
    font-size: 0.95rem;
    text-align: center;
  }

  .description {
    font-size: 0.75rem;
    opacity: 0.8;
    text-align: center;
    line-height: 1.3;
  }

  @media (max-width: 768px) {
    .topics-grid {
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    }

    .topic-button {
      padding: 15px;
      gap: 8px;
    }

    .emoji {
      font-size: 1.5rem;
    }

    .name {
      font-size: 0.85rem;
    }

    .description {
      font-size: 0.65rem;
    }
  }
</style>
