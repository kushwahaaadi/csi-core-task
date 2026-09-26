/**
 * Bennett University Enrollment Number Validation & Helper Utilities
 * Standard Bennett format: [E/S][Year 2 digits][School/Branch Code][Roll 4 digits]
 * Example provided by user: s24cseu1214
 */

export const BENNETT_ENROLLMENT_REGEX = /^[esES]\d{2}[a-zA-Z]{2,5}\d{3,5}$/;

export function validateBennettEnrollment(enrollment) {
  if (!enrollment || typeof enrollment !== 'string') {
    return {
      isValid: false,
      message: 'Enrollment number is required.',
      normalized: '',
    };
  }

  const trimmed = enrollment.trim();
  const normalized = trimmed.toUpperCase();

  // Basic length check (typically 10-14 chars like S24CSEU1214, E23CSE0012)
  if (trimmed.length < 8 || trimmed.length > 15) {
    return {
      isValid: false,
      message: 'Enrollment must be between 8 and 14 characters (e.g., S24CSEU1214).',
      normalized,
    };
  }

  if (!BENNETT_ENROLLMENT_REGEX.test(trimmed)) {
    return {
      isValid: false,
      message: 'Invalid Bennett format. Expected format: S24CSEU1214 or E23CSEU0045.',
      normalized,
    };
  }

  // Parse details
  const prefix = normalized[0]; // 'S' or 'E'
  const year = '20' + normalized.slice(1, 3);
  
  return {
    isValid: true,
    message: `Valid Bennett University (${year} Batch)`,
    normalized,
    batchYear: year,
    studentType: prefix === 'S' ? 'Student' : 'Enrolled Scholar',
  };
}

export function formatEnrollment(val) {
  if (!val) return '';
  return val.trim().toUpperCase();
}
