-- Initial database schema. Applied by `npm run migrate`.
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY, name VARCHAR(120) NOT NULL CHECK (length(trim(name)) > 0),
  email VARCHAR(254) NOT NULL UNIQUE, password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS readings (
  id BIGSERIAL PRIMARY KEY, user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reading_date DATE NOT NULL CHECK (reading_date <= CURRENT_DATE),
  time_slot VARCHAR(24) NOT NULL CHECK (time_slot IN ('morning','after_breakfast','after_lunch','after_dinner')),
  glucose_value INTEGER NOT NULL CHECK (glucose_value BETWEEN 40 AND 600),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT readings_user_date_slot_unique UNIQUE(user_id, reading_date, time_slot)
);
CREATE INDEX IF NOT EXISTS readings_user_date_idx ON readings(user_id, reading_date DESC);
