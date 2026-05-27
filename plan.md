# Implementation Plan - IGERI AI

IGERI AI is a child-safe, curriculum-aligned AI learning companion for Nigerian children. It features age-gated response systems, Nigerian curriculum alignment (NERDC), and a distinct Nigerian cultural identity.

## Scope Summary
- **Target Audience:** Nigerian children aged 5-17 (3 tiers: Buba Mode, Kemi Mode, Chike Mode).
- **Core Features:** AI Q&A with homework guardrails, curriculum-aligned subjects, multi-language support (English/Pidgin initial), and parent/teacher dashboards.
- **Design:** Nigerian-centric palette (Nigerian Green, Adire Gold, Earth Brown, Cream), mascot-driven (Igeri), and culturally relevant examples.
- **Data/Persistence:** All data and user state will be handled via **localStorage** for this phase, as no server-side database (Supabase) is available in this session.
- **AI Integration:** Simulated AI responses with tier-specific logic and guardrails.

## Assumptions & Open Questions
- **Assumption:** Since Supabase is unavailable, we will use a robust `localStorage` pattern for user profiles (parent/child), conversation history, and settings.
- **Assumption:** AI logic (guardrails, age tiers) will be implemented as client-side prompt logic or mock services for the prototype.
- **Question:** Are there specific NERDC topics beyond the general subject list to include as "Quick Starts"? (Plan includes general subjects like Maths, English, Basic Science).

## Affected Areas
- **Frontend (Next.js/React):** Core application shell, routing, and component library.
- **State Management:** LocalStorage-based persistence for profiles and chats.
- **Design System:** Implementation of the Nigerian-centric color palette and Adire patterns.
- **AI Service Layer:** Prompt construction for different age tiers (Buba, Kemi, Chike).

## Implementation Phases

### Phase 1: Foundation & Design System (Frontend)
- Set up project structure and theme.
- Define the color palette (Nigerian Green: #008751, Adire Gold: #C8922A, etc.) in `src/index.css`.
- Create base UI components (Button, Card, Input) with the "Nigerian and Indigenous" feel.
- **Owner:** `frontend_engineer`

### Phase 2: Profile & Mode Selection (Frontend/Logic)
- Implement "Parent Setup" and "Child Profile" creation (stored in localStorage).
- Build the "Mode Selection" screen (Buba 5-8, Kemi 9-13, Chike 14-17).
- Implement age-gated visuals and tone for each mode.
- **Owner:** `frontend_engineer`

### Phase 3: Core AI Learning Companion (Frontend/Logic)
- Build the main chat interface with the "Igeri" mascot.
- Implement "Anti-Dependency Guardrails": logic that prevents direct answers and provides hints.
- Subject selection (NERDC aligned: Maths, English, Science).
- Implement basic multilingual toggle (English/Pidgin).
- **Owner:** `frontend_engineer`

### Phase 4: Dashboards & Reporting (Frontend/Logic)
- Parent Dashboard: View conversation logs, session summaries, and subject locks.
- Teacher Dashboard (MVP): Engagement overview and PDF export mock.
- Data persistence for session history using `localStorage`.
- **Owner:** `frontend_engineer`

### Phase 5: Polishing & Refinement (Quick Fixes)
- Add Adire/Ankara patterns to decorative borders.
- Refine tone of voice in UI copy ("Well done!", "You sabi this!").
- Final visual touch-ups on mascot and icons.
- **Owner:** `quick_fix_engineer`

## Sequencing Constraints
- Phase 1 must be completed before any functional UI is built.
- Phase 2 (Profile/Mode) is a prerequisite for Phase 3 (Chat) to ensure the correct AI "Mode" is active.
- Phase 4 relies on Phase 3 generating conversation data to display.
