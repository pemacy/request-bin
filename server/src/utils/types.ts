export type BinInterface = {
  id: string,
  session_id: string,
  created_at: Date
}

export type Payload = {
  id: string;
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
  payload: Payload;
}

