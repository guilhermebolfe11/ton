import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    globals: true,
    exclude: ['**/node_modules/**', '**/build/**', '**/coverage/**'],
    coverage: {
      reporter: ['json', 'json-summary'],
    },
  },
})
