const MEDICAL_CONDITION_MIN_LENGTH = 10;
const SINGLE_WORD_NAME_MIN_LENGTH = 3;

export function validateMedicalCondition(value: string): string | null {
  const trimmed = value.trim();
  if (trimmed.length < MEDICAL_CONDITION_MIN_LENGTH) {
    return `Please describe your medical condition in at least ${MEDICAL_CONDITION_MIN_LENGTH} characters.`;
  }
  return null;
}

export function validateName(value: string): string | null {
  const trimmed = value.trim();
  const words = trimmed.split(/\s+/).filter(Boolean);

  if (words.length === 1 && words[0].length < SINGLE_WORD_NAME_MIN_LENGTH) {
    return `Please enter your full name (at least ${SINGLE_WORD_NAME_MIN_LENGTH} characters if using a single name).`;
  }

  return null;
}

export function validateReportFiles(fileCount: number): string | null {
  if (fileCount < 1) {
    return "Please upload at least one medical report (image or PDF).";
  }
  return null;
}

export function validateLeadFormFields(fields: {
  name: string;
  medicalCondition: string;
  fileCount?: number;
}): string | null {
  return (
    validateName(fields.name) ??
    validateMedicalCondition(fields.medicalCondition) ??
    (fields.fileCount !== undefined ? validateReportFiles(fields.fileCount) : null)
  );
}
