/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validates an email address
 * @param email - The email address to validate
 * @returns ValidationResult with isValid boolean and errors array
 */
export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];

  // Check if email is provided (required field)
  if (!email || email.trim() === '') {
    errors.push('Email is required');
    return {
      isValid: false,
      errors,
    };
  }

  // Check maximum length (254 characters)
  if (email.length > 254) {
    errors.push('Email is too long (maximum 254 characters)');
  }

  // Validate email format using regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push('Please enter a valid email address');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
