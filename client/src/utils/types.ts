export type Payload = {
  id: string;
  [key: string]: any;
}

export type Record = {
  id: number;
  method: string;
  bin_id: string;
  created_at: string;
  headers: string[];
  mongo_doc_id: string | null;
}

export type RecordWithDoc = {
  id: number;
  method: string;
  bin_id: string;
  created_at: string;
  headers: string[];
  payload: Payload;
}

export interface BinInterface {
  id: string;
  created_at: string;
  session_id: string;
}

export type AppView = 'home' | 'modal' | 'bins';

export type FormProps = {
  setBins?: React.Dispatch<React.SetStateAction<BinInterface[]>>;
  setView?: React.Dispatch<React.SetStateAction<AppView>>;
  setSelectedBin?: React.Dispatch<React.SetStateAction<BinInterface>> | undefined;
}

export type SidebarProps = {
  bins: BinInterface[];
  setRecords?: React.Dispatch<React.SetStateAction<RecordWithDoc[]>>;
  setView: AppView;
}

export type ModalProps = {
  bin: BinInterface
}

export type BinPageProps = {
  bin: BinInterface;
  records: RecordWithDoc[];
}

export type BinPageHeaderProps = {
  bin: BinInterface;
  records: RecordWithDoc[];
}

export type BinComponentProps = {
  bin: BinInterface;
  records: RecordWithDoc[];
}

export type RecordComponentProps = {
  record: RecordWithDoc;
}
