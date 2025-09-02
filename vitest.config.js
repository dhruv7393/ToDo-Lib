import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Test configuration
    globals: true,
    environment: 'node',
    include: ['testfiles/**/*.test.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'testfiles/',
        'coverage/',
        '*.config.js',
        '*.config.ts'
      ],
      include: [
        '**/*.js'
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    }
  }
})
