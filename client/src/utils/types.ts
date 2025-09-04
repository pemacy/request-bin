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
  headers: string;
  payload: Payload;
}

export interface BinInterface {
  id: string;
  created_at: string;
  session_id: string;
}

export type AppView = 'home' | 'modal' | 'bins';

export type FormProps = {
  setBins: React.Dispatch<React.SetStateAction<BinInterface[]>>;
  setRecords: React.Dispatch<React.SetStateAction<RecordWithDoc[]>>;
  setView: React.Dispatch<React.SetStateAction<AppView>>;
  setSelectedBin: React.Dispatch<React.SetStateAction<BinInterface | undefined>>;
}

export type SidebarProps = {
  bins: BinInterface[];
  setRecords: React.Dispatch<React.SetStateAction<RecordWithDoc[]>>;
  setView: React.Dispatch<React.SetStateAction<AppView>>;
  setSelectedBin: React.Dispatch<React.SetStateAction<BinInterface | undefined>>;
}

export type ModalProps = {
  selectedBin: BinInterface;
  setView: React.Dispatch<React.SetStateAction<AppView>>;
  setSelectedBin: React.Dispatch<React.SetStateAction<BinInterface | undefined>>;
}

export type BinPageProps = {
  selectedBin: BinInterface;
  records: RecordWithDoc[];
  setView: React.Dispatch<React.SetStateAction<AppView>>;
}

export type BinProps = {
  selectedBin: BinInterface;
  records: RecordWithDoc[];
}

export type BinPageHeaderProps = {
  setView: React.Dispatch<React.SetStateAction<AppView>>;
}

export type BinComponentProps = {
  selectedBin: BinInterface;
  records: RecordWithDoc[];
  setView: React.Dispatch<React.SetStateAction<AppView>>;
}

export type RecordComponentProps = {
  record: RecordWithDoc;
}
