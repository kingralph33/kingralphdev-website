/**
 * Unit tests for error handling utility functions
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getErrorMessage } from '../../../utils/errorHandling';

describe('errorHandling - getErrorMessage', () => {
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

  it('handles Error with empty message', () => {
    // Ensure online state
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true,
    });

    const result = getErrorMessage(new Error(''));
    
    expect(result).toBe('');
  });

  it('handles complex error messages', () => {
    // Ensure online state
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true,
    });

    const complexMessage = 'Failed to load any blog posts. Errors: Error 1; Error 2; Error 3';
    const result = getErrorMessage(new Error(complexMessage));
    
    expect(result).toBe(complexMessage);
  });
});

