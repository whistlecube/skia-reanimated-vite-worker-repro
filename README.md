# Skia + Reanimated Production Issue

React + Vite on a Cloudflare Worker. Skia + Reanimated doesn't work in production (`npm run preview`). Animations don't run at all, using the "Hello World" example in the Skia docs.

## Reproduction Steps

1. Install dependencies:
   ```bash
   bun install
   ```

2. Build and preview in production mode:
   ```bash
   bun run preview
   ```

## Expected vs Actual Results

- **Expected**: Circles are animated as shown in the Skia example
- **Actual**: Animations don't run at all

## Notes

`bun dev` doesn't work either in this state, but for unrelated reasons. My larger project exhibits the same symptoms in production but works fine in dev. This reproduction specifically targets the production environment.