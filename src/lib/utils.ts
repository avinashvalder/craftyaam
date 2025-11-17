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
  const normalizedEmail = (email ?? '').trim();

  // Check if email is provided (required field)
  if (!normalizedEmail) {
    errors.push('Email is required');
    return {
      isValid: false,
      errors,
    };
  }

  // Check maximum length (254 characters)
  if (normalizedEmail.length > 254) {
    errors.push('Email is too long (maximum 254 characters)');
  }

  const parts = normalizedEmail.split('@');

  if (parts.length === 2) {
    const [localPart, domainPart] = parts;

    // RFC 5321 limits local part to 64 characters
    if (!localPart || localPart.length > 64) {
      errors.push('Email local part must be between 1 and 64 characters');
    }

    if (!domainPart) {
      errors.push('Please enter a valid email address');
    } else {
      const domainLabels = domainPart.split('.');
      if (domainLabels.some((label) => !label || label.length > 63)) {
        errors.push('Please enter a valid email address');
      } else {
        const tld = domainLabels.at(-1) ?? '';
        const tldRegex = /^[a-zA-Z]{2,24}$/;
        if (!tldRegex.test(tld)) {
          errors.push('Email domain must end with a valid top-level domain');
        }
      }
    }
  } else {
    errors.push('Please enter a valid email address');
  }

  // Validate email format using a stricter regex
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(normalizedEmail)) {
    errors.push('Please enter a valid email address');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
