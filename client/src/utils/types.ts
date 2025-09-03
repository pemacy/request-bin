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

export interface BinInterface {
  id: string;
  created_at: Date;
  session_id: string;
}

export type AppView = 'home' | 'modal' | 'bins';

export type FormProps = {
  setBins?: React.Dispatch<React.SetStateAction<BinInterface[]>>;
  setView?: React.Dispatch<React.SetStateAction<AppView>>;
  setSelectedBin?: React.Dispatch<React.SetStateAction<BinInterface>>;
}

export type SidebarProps = {
  bins: BinInterface[];
  setRecords?: React.Dispatch<React.SetStateAction<RecordWithDoc[]>>;
  setView: AppView;
}

export type BinHeaderProps = {
  bin: BinInterface;
  records: RecordWithDoc[];
}

export type ModalProps = {
  bin: BinInterface
}

export type BinComponentProps = {
  bin: BinInterface;
  records: RecordWithDoc[];
}
