-- schema.sql
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS bins;
DROP TABLE IF EXISTS requests;

CREATE TABLE sessions (
  id text PRIMARY KEY,
  created_at datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bins (
  id text PRIMARY KEY,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  session_id text,
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);

CREATE TABLE requests (
  id serial PRIMARY KEY,
  method text NOT NULL,
  path text NOT NULL,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  bin_id text NOT NULL,
  mongo_payload_id text,
  FOREIGN KEY (bin_id) REFERENCES bins(id) ON DELETE CASCADE
);
