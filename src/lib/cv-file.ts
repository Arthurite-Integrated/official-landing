const MAX_CV_BYTES = 5 * 1024 * 1024;
const CV_TYPES = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

export const CV_HINT = "PDF or DOCX, max 5 MB";

export function cvFileError(file: File): string | undefined {
  if (!CV_TYPES.includes(file.type)) return "Your CV must be a PDF or DOCX file";
  if (file.size > MAX_CV_BYTES) return "Your CV must be smaller than 5 MB";
  return undefined;
}
