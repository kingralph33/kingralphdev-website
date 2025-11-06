/**
 * Vitest setup file
 * Configures the testing environment with necessary polyfills and utilities
 */

import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock navigator.onLine for network tests
Object.defineProperty(navigator, 'onLine', {
  writable: true,
  value: true,
});

// Extend Vitest matchers with jest-dom
expect.extend({});
