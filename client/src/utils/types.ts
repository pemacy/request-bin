export type Package = {
  [key: string]: any;
}

export type Bin = {
  id: string,
  session_id: string,
  created_at: Date
}

export type Record = {
  id: number
  method: string
  bin_id: string
  created_at: Date
  payload: Package
}
