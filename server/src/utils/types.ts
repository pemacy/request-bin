export type BinInterface = {
  id: string,
  session_id: string,
  created_at: Date
}

export type WebhookDoc = {
  id: string;
  payload: MongoDoc;
  headers: MongoDoc;
}

export type MongoDoc = {
  [key: string]: any;
}

export type Record = {
  id: number
  method: string
  bin_id: string
  created_at: Date
  mongo_doc_id: string | null
}

export type RecordWithDoc = {
  id: number;
  method: string;
  bin_id: string;
  created_at: Date;
  payload: MongoDoc;
  mongo_doc_id: string;
  headers: MongoDoc;
}

