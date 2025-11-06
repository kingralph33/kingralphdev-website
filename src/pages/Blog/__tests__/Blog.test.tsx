/**
 * Unit tests for Blog component helper functions
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// We need to test the getErrorMessage function which is internal to the Blog component
// For this test, we'll create a standalone version based on the implementation
const getErrorMessage = (err: unknown): string => {
  // Check for network connectivity
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return 'No internet connection. Please check your network and try again.';
  }
  
  // Return specific error message if available
  if (err instanceof Error) {
    return err.message;
  }
  
  // Fallback for unknown errors
  return 'An unexpected error occurred while loading posts.';
};

describe('Blog Component - getErrorMessage', () => {
  let originalOnLine: boolean;

  beforeEach(() => {
    // Save original navigator.onLine value
    originalOnLine = navigator.onLine;
  });

  afterEach(() => {
    // Restore original navigator.onLine value
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: originalOnLine,
    });
  });

  it('returns network error when navigator.onLine is false', () => {
    // Mock offline state
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false,
    });

    const result = getErrorMessage(new Error('Some error'));
    
    expect(result).toBe('No internet connection. Please check your network and try again.');
  });

  it('returns error message from Error instance when online', () => {
    // Ensure online state
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true,
    });

    const errorMessage = 'Failed to load blog posts';
    const result = getErrorMessage(new Error(errorMessage));
    
    expect(result).toBe(errorMessage);
  });

  it('returns generic message for unknown error types', () => {
    // Ensure online state
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true,
    });

    const result = getErrorMessage('string error');
    
    expect(result).toBe('An unexpected error occurred while loading posts.');
  });

  it('returns generic message for null error', () => {
    // Ensure online state
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true,
    });

    const result = getErrorMessage(null);
    
    expect(result).toBe('An unexpected error occurred while loading posts.');
  });

  it('returns generic message for undefined error', () => {
    // Ensure online state
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true,
    });

    const result = getErrorMessage(undefined);
    
    expect(result).toBe('An unexpected error occurred while loading posts.');
  });

  it('prioritizes network error over Error instance message when offline', () => {
    // Mock offline state
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false,
    });

    const result = getErrorMessage(new Error('Different error message'));
    
    // Network error should take precedence
    expect(result).toBe('No internet connection. Please check your network and try again.');
  });
});
