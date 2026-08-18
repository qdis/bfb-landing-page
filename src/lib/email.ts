// ABOUTME: Validates waitlist emails and builds the transactional signup messages.
// ABOUTME: The Worker sends these through the EMAIL binding after a new D1 insert.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const DEFAULT_FROM_EMAIL = "waitlist@bfb.sh";
export const DEFAULT_FROM_NAME = "Big Fat Board";
export const DEFAULT_NOTIFY_EMAIL = "timo@devplant.ro";

export type OutboundMail = {
  to: string;
  from: { email: string; name: string };
  subject: string;
  text: string;
  html: string;
};

export type MailSender = {
  send(message: OutboundMail): Promise<unknown>;
};

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

export function isReservedExampleEmail(email: string): boolean {
  return (
    email.endsWith("@example.com") ||
    email.endsWith("@example.org") ||
    email.endsWith("@example.net") ||
    email.endsWith(".example.com")
  );
}

export function shouldSendWaitlistEmail(email: string): boolean {
  return isValidEmail(email) && !isReservedExampleEmail(normalizeEmail(email));
}

export function welcomeMail(email: string, fromEmail = DEFAULT_FROM_EMAIL): OutboundMail {
  const text = [
    "Seat saved.",
    "",
    "You are on the Big Fat Board waitlist.",
    "We write once, when the board opens. No drip.",
    "",
    "BFB = BIG FAT BOARD",
  ].join("\n");
  return {
    to: email,
    from: { email: fromEmail, name: DEFAULT_FROM_NAME },
    subject: "Seat saved.",
    text,
    html: `<p>Seat saved.</p><p>You are on the Big Fat Board waitlist. We write once, when the board opens. No drip.</p><p>BFB = BIG FAT BOARD</p>`,
  };
}

export function notifyMail(
  email: string,
  notifyTo: string,
  fromEmail = DEFAULT_FROM_EMAIL,
): OutboundMail {
  const text = `${email} joined the BFB waitlist.`;
  return {
    to: notifyTo,
    from: { email: fromEmail, name: "BFB Waitlist" },
    subject: `New seat · ${email}`,
    text,
    html: `<p>${email} joined the BFB waitlist.</p>`,
  };
}

export async function sendSignupEmails(input: {
  sender: MailSender;
  email: string;
  notifyTo?: string;
  fromEmail?: string;
}): Promise<{ welcome: boolean; notify: boolean }> {
  const email = normalizeEmail(input.email);
  if (!shouldSendWaitlistEmail(email)) {
    return { welcome: false, notify: false };
  }
  const fromEmail = input.fromEmail ?? DEFAULT_FROM_EMAIL;
  const notifyTo = input.notifyTo ?? DEFAULT_NOTIFY_EMAIL;
  let welcome = false;
  let notify = false;
  try {
    await input.sender.send(welcomeMail(email, fromEmail));
    welcome = true;
  } catch (error) {
    console.error("waitlist welcome email failed", error);
  }
  if (notifyTo && notifyTo !== email) {
    try {
      await input.sender.send(notifyMail(email, notifyTo, fromEmail));
      notify = true;
    } catch (error) {
      console.error("waitlist notify email failed", error);
    }
  }
  return { welcome, notify };
}
