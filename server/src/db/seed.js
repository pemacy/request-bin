// seed.js
require("dotenv").config({ path: ".env.development", override: true });

const mongoose = require("mongoose");
const { Client } = require("pg");
const pgClient = new Client();

const webhookPayloadSchema = new mongoose.Schema({
  id: String,
  payload: {},
  headers: {},
});

webhookPayloadSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const WebhookPayload = mongoose.model("WebHookPayloads", webhookPayloadSchema);

console.log(
  "Attempting Postgres Connection in environment:",
  process.env.NODE_ENV,
);
console.log("PGUSER:", process.env.PGUSER);
console.log("PGPASSWORD:", process.env.PGPASSWORD);
console.log("PGHOST:", process.env.PGHOST);
console.log("PGPORT:", process.env.PGPORT);
console.log("PGDATABASE:", process.env.PGDATABASE);

async function seed() {
  await pgClient.connect();
  await mongoose.connect(
    process.env.MONGO_URL ||
      "mongodb://localhost:27017/request_bin_development",
  );

  // Clean out old data
  await pgClient.query("DELETE FROM records");
  await pgClient.query("DELETE FROM bins");
  await WebhookPayload.deleteMany({});

  // --- Insert bins ---
  const bins = [
    { id: "bin_1", session_id: "test" },
    { id: "bin_2", session_id: "test" },
  ];

  for (const bin of bins) {
    await pgClient.query("INSERT INTO bins (id, session_id) VALUES ($1, $2)", [
      bin.id,
      bin.session_id,
    ]);
  }

  // --- Insert records and Mongo payloads ---
  for (const bin of bins) {
    for (let i = 1; i <= 1; i++) {
      let payload = { content: "Record" + i };
      let headers = {
        "content-type": "application/json",
        "user-agent": "PostmanRuntime/7.44.1",
        accept: "*/*",
        "postman-token": "5272e5d9-00a4-4a7e-bcd2-dc100c47cf74",
        host: "localhost:3000",
        "accept-encoding": "gzip, deflate, br",
        connection: "keep-alive",
        "content-length": "54",
      };

      const newPayload = new WebhookPayload({ payload, headers });
      const savedPayload = await newPayload.save();
      const mongoId = savedPayload._id.toString();

      // Insert Postgres record referencing mongoId
      await pgClient.query(
        "INSERT INTO records (method, bin_id, mongo_doc_id) VALUES ($1, $2, $3)",
        ["POST", bin.id, mongoId],
      );
    }
  }

  console.log("Database seeded successfully!");
  await pgClient.end();
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
