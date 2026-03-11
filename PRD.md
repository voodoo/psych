# PSYCH — Carl Jung Psychology Explorer

## Overview
A voice-powered web app for exploring Jungian psychology concepts through conversational AI (VAPI). Users select a topic and engage in guided analysis with customizable system prompts.

## Core Features

### 1. Topic Selection
Five core Jungian psychology topics:
1. **The Shadow** — The unconscious aspects of personality that the conscious ego doesn't identify with
2. **Archetypes** — Universal, primordial prototypes for human behavior and experience
3. **The Collective Unconscious** — Shared psychological inheritance of humanity
4. **Individuation** — The process of becoming your true self
5. **Synchronicity** — Meaningful coincidences and acausal connections

### 2. Voice Conversation
- User selects a topic
- System prompt is loaded (topic-specific)
- User speaks or types
- VAPI AI responds with Jungian analysis
- Conversation history is displayed

### 3. System Prompts
Each topic has a customizable system prompt that guides the AI's responses:
- Tone: Thoughtful, exploratory, non-judgmental
- Focus: Jungian concepts, personal reflection, psychological insight
- Goal: Help user understand themselves through Jungian lens

### 4. UI/UX
- Clean, minimal interface
- Topic selector (buttons or dropdown)
- Conversation display
- Voice input button (VAPI)
- Text input fallback
- Dark/light theme toggle

## Technical Stack
- **Frontend**: SvelteKit (TypeScript)
- **Voice AI**: VAPI.ai
- **Styling**: CSS (dark/light theme)
- **Deployment**: Vercel or similar

## MVP Scope
1. ✅ Basic VAPI integration (already done)
2. ✅ Theme toggle (already done)
3. 🔲 Topic selector component
4. 🔲 Topic-specific system prompts
5. 🔲 Conversation history per topic
6. 🔲 Responsive design

## Future Enhancements
- Save conversations to local storage
- Export analysis as PDF
- Multiple language support
- Integration with journaling
- Dream analysis module
- Personality type assessment (MBTI, Enneagram)
