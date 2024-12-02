import { PostgrestError } from '@supabase/supabase-js';

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleSupabaseError(error: PostgrestError): AppError {
  const message = getErrorMessage(error);
  return new AppError(message, error.code, error);
}

function getErrorMessage(error: PostgrestError): string {
  switch (error.code) {
    case '23505':
      return 'This record already exists.';
    case '23503':
      return 'Referenced record does not exist.';
    case '42P01':
      return 'Database table not found.';
    case '42703':
      return 'Database column not found.';
    default:
      return error.message || 'An unexpected error occurred.';
  }
}

export function isSupabaseError(error: unknown): error is PostgrestError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error &&
    'details' in error
  );
}