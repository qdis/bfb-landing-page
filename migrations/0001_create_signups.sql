-- Waitlist emails collected from the coming-soon landing.
CREATE TABLE IF NOT EXISTS signups (
  email TEXT PRIMARY KEY NOT NULL,
  created_at TEXT NOT NULL
);
