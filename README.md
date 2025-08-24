React + Vite on a Cloudflare Worker. Skia + Reanimated doesn't work in production (npm run preview). Animations don't run at all, using the "Hello World" example in the Skia docs.

'npm run dev' doesn't work either in this state, but for unrelated reasons. My larger project exhibits the same symptoms in production but works fine in dev. This repro specifically targets the production environment.