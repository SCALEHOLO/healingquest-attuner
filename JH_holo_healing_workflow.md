**HOLO Healing Quest Workflow: Developer Joshua Hopkins 07/26/25**

---

### PHASE 1: Repository & Environment Setup

**Objectives:** Ensure the project is cloned, accessible, and development-ready.

- [x] Gain access to HOLO Healing Quest GitHub repository (NOT original attuner.ai)
- [x] Clone the repository locally and open in VS Code
- [x] Run `npm install` to install all dependencies
- [x] Ensure `.env.local` has the correct Firebase config for dev environment
- [x] Confirm app compiles and runs locally via `npm run dev`

---

### PHASE 2: Questionnaire Redesign (Ritu-led, You Review)

**Objectives:** Replace the original attuner.ai questions with updated Healing Quest content.

- [ ] Update quiz text ("Discover your consciousness profile" → "Discover your wholeness profile")
- [ ] Replace questionnaire with Brooks' new questions (8 life dimensions + meta categories)
- [ ] Confirm quiz uses various input types (not just multiple choice)
- [ ] Ensure page-by-page navigation works (Next/Back)
- [ ] Validate mobile-responsiveness and accessibility of quiz UI

---

### PHASE 3: Scoring Logic & Interpretation (You + Cline)

**Objectives:** Replace hardcoded or placeholder scoring logic with real category mapping + Harmony Engine interpreter.

- [X] **[Step 1]** Implement `calculateScores.ts` to compute 0–10 scores across 8 core categories
- [X] **[Step 2]** Normalize input structure using a pure function
- [X] **[Step 3]** Build `HarmonyEngine.ts` to generate:
  - [x] Dominant category name
  - [x] Interpretive text
  - [x] Visual theme or token to pass to result page

---

### PHASE 4: Visual & UI Upgrades

**Objectives:** Replace static visuals with a dynamic 8-axis radar chart and thematic UI.

- [X] **[Step 4]** Replace image-based radar with `HoloboidRadarChart.tsx` using `react-chartjs-2`
- [X] Animate chart rendering with easing effect
- [X] Create `HarmonyInsight.tsx` to display interpretation and suggestions
- [ ] Enable dynamic theming based on dominant trait
  - [ ] Colors
  - [ ] SVG overlays
  - [ ] Optional: particle background

---

### PHASE 5: Submission & Email Flow

**Objectives:** Hook up completion actions for event use and future analysis.

- [X] **[Step 5]** Store raw quiz responses in Firebase under user ID/email
- [ ] **[Step 6]** Auto-generate summary email with chart + insight (EmailJS or Firebase Function)
- [ ] Store interpreted result separately for dashboard queries

---

### PHASE 6: QR Deployment & Testing

**Objectives:** Prep for real-world usage at Sunday event.

- [ ] Deploy app to `holohealingquest.attuner.ai`
- [ ] Generate & test working QR code to app landing page
- [ ] Confirm full flow: landing → quiz → score → email
- [ ] Cross-browser test (Safari, Chrome, mobile)
- [ ] Perform final runthrough using test email to simulate participant
