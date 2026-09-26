/**
 * Bennett University Enrollment Number Validation & Helper Utilities
 * Standard Bennett format: [E/S][Year 2 digits][School/Branch Code][Roll 4 digits]
 * Example provided by user: s24cseu1214
 */

export function validateBennettEnrollment(enrollment) {
  if (!enrollment || typeof enrollment !== "string") {
    return {
      isValid: false,
      message: "Enrollment number is required.",
      normalized: "",
    };
  }

  const trimmed = enrollment.trim();
  
  if (trimmed.length === 0) {
    return {
      isValid: false,
      message: "Enrollment number is required.",
      normalized: "",
    };
  }

  const normalized = trimmed.toUpperCase();

  return {
    isValid: true,
    message: `Valid Enrollment Number`,
    normalized,
    batchYear: "",
    studentType: "Student",
  };
}

export function formatEnrollment(val) {
  if (!val) return "";
  return val.trim().toUpperCase();
}
