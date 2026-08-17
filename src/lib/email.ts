// ABOUTME: Validates and normalizes waitlist email addresses for the signup path.
// ABOUTME: The Worker handler and unit tests call this function directly.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

export function isValidEmail(raw: string): boolean {
  const email = normalizeEmail(raw);
  if (email.length < 6 || email.length > 254) {
    return false;
  }
  if (!EMAIL_PATTERN.test(email)) {
    return false;
  }
  const at = email.indexOf("@");
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (!local || !domain) {
    return false;
  }
  if (local.startsWith(".") || local.endsWith(".")) {
    return false;
  }
  if (domain.startsWith("-") || domain.endsWith("-")) {
    return false;
  }
  if (domain.startsWith(".") || domain.endsWith(".")) {
    return false;
  }
  if (!domain.includes(".")) {
    return false;
  }
  return true;
}
