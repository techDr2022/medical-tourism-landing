export const MAX_FILE_SIZE_MB = 5;
export const MAX_FILE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const MAX_FILES = 10;

export const ACCEPTED_FILE_TYPES = "image/*,.pdf";

export function fileIdentity(file: File): string {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

export function mergeSelectedFiles(existing: File[], incoming: File[]): File[] {
  const merged = [...existing];
  for (const file of incoming) {
    if (merged.length >= MAX_FILES) break;
    const id = fileIdentity(file);
    if (!merged.some((f) => fileIdentity(f) === id)) {
      merged.push(file);
    }
  }
  return merged;
}

export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.includes(",") ? result.split(",")[1] : result;
      resolve(base64 ?? "");
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
