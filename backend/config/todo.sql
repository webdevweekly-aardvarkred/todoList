CREATE TABLE IF NOT EXISTS todos (
  id SERIAL,
  task TEXT,
  completed BOOLEAN,
  importance TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);
