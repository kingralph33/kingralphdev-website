import { expect, afterEach, beforeAll, beforeEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Mock matchMedia for components that use it
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

// Set up localStorage mock before each test
beforeEach(() => {
  const localStorageMock: Storage = {
    length: 0,
    clear: function () {
      Object.keys(this).forEach((key) => {
        if (key !== 'length' && key !== 'clear' && key !== 'getItem' && key !== 'key' && key !== 'removeItem' && key !== 'setItem') {
          delete this[key as keyof typeof this];
        }
      });
      this.length = 0;
    },
    getItem: function (key: string) {
      return this[key as keyof typeof this] as string || null;
    },
    key: function (index: number) {
      return Object.keys(this)[index] || null;
    },
    removeItem: function (key: string) {
      delete this[key as keyof typeof this];
      this.length = Math.max(0, this.length - 1);
    },
    setItem: function (key: string, value: string) {
      if (!(key in this)) {
        this.length++;
      }
      this[key as keyof typeof this] = value as any;
    },
  };

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
    configurable: true,
  });
});

// Cleanup after each test case
afterEach(() => {
  cleanup();
  localStorage.clear();
});
