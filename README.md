# CookRight

**CookRight** is a cross-platform app that helps people who are dieting or cutting weight figure out what to cook using the ingredients they already have — while staying aligned with their macro and nutrition goals.

This project is in active development and will eventually support both a web interface and a dedicated iOS app.

---

## Motivation

When you're focused on eating healthy, it can be hard to decide *how* to turn your clean ingredients (like chicken, vegetables, and rice) into an actual meal. CookRight was inspired by a personal need: using the right foods but still struggling to come up with tasty, macro-friendly meals.

CookRight takes the stress out of meal planning by:
- Letting you input what ingredients you have
- Recommending meals that fit your macros
- Giving prep steps and seasoning suggestions
- Making it easy to discover, cook, and enjoy healthy food

---

## Tech Stack

### Frontend
- [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/) (Planned)
- [React Native](https://reactnative.dev/) for iOS (Planned)

### Backend
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) or [PostgreSQL](https://www.postgresql.org/) (TBD)
- [OpenAI API](https://platform.openai.com/) for enhanced meal generation (Planned)
- [Spoonacular API](https://spoonacular.com/food-api) or custom recipe matching

### Hosting
- Vercel/Netlify for frontend (Planned)
- Render/Railway for backend (Planned)
- TestFlight + App Store for iOS app (Future)

---

## Current Features (MVP)

- [x] Ingredient input (static for now)
- [x] Frontend/backend connection (local)
- [ ] Send ingredients to backend
- [ ] Generate meal ideas from ingredients
- [ ] Show macros per meal
- [ ] Save/favorite meals
- [ ] Mobile version (React Native)

---

## Roadmap

### Phase 1 – MVP
- Manual ingredient input
- Basic recipe generator
- Display prep instructions and macros
- Save meals to local storage

### Phase 2 – Full Product
- AI-powered meal generator (GPT or fine-tuned model)
- MacroFactor or MyFitnessPal integration
- "Surprise Me" meal mode
- Barcode scanner for ingredient logging (iOS)
- Profile with preferences (e.g. high-protein, no seafood)

---

## Local Setup Instructions

```bash
# Clone the repo
git clone https://github.com/your-username/cookright.git
cd cookright

# Set up frontend
cd client
npm install
npm run dev

# Set up backend
cd ../server
npm install
node index.js
