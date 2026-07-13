export const DEFAULT_CONTACT_EMAIL = "info@techdr.in";
export const DEFAULT_WHATSAPP_NUMBER = "916303225006";

export function formatWhatsAppDisplay(number: string): string {
  const digits = number.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  if (digits.length >= 12) {
    return `+${digits.slice(0, 2)} ${digits.slice(2)}`;
  }
  return `+${digits}`;
}
