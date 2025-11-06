/**
 * Error handling utilities
 */

/**
 * Get user-friendly error message from unknown error type
 * Handles network errors, Error instances, and unknown errors
 */
export function getErrorMessage(err: unknown): string {
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
}
