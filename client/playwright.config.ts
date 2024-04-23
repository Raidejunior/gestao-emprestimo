import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Pasta onde serão implementados os testes de ponta-a-ponta.
  testDir: 'e2e',
} );