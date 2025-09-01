-- schema.sql
DROP TABLE IF EXISTS bins;
DROP TABLE IF EXISTS records;

CREATE TABLE bins (
  id text PRIMARY KEY,
  session_id text NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE records (
  id serial PRIMARY KEY,
  method text NOT NULL,
  bin_id text NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  mongo_doc_id text,
  FOREIGN KEY (bin_id) REFERENCES bins(id) ON DELETE CASCADE
);
