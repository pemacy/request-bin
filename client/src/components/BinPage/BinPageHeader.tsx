import type { MouseEvent } from "react"
import { getBin, getBins, deleteBin, deleteRecords } from "../../services/webhookApi"
import type * as appType from "../../utils/types"
import type { BinPageHeaderProps } from "../../utils/types"
import { RiFileShredLine } from "react-icons/ri";
import { FcReuse } from "react-icons/fc";

const removeRecords = async (
  e: MouseEvent<HTMLElement>,
  selectedBin: appType.BinInterface,
  setView: React.Dispatch<React.SetStateAction<appType.AppView>>,
  setSelectedBin: React.Dispatch<React.SetStateAction<appType.BinInterface | undefined>>,
  setRecords: React.Dispatch<React.SetStateAction<appType.RecordWithDoc[]>>
) => {
  e.stopPropagation()
  if (!selectedBin.id) throw new Error('removeRecords: Error validating bin exists before deletiong its records')
  await deleteRecords(selectedBin.id)
  const bin = await getBin(selectedBin.id)
  setView('bins')
  setSelectedBin(bin)
  setRecords([]);
}

const removeBin = async (
  e: MouseEvent<HTMLElement>,
  setBins: React.Dispatch<React.SetStateAction<appType.BinInterface[]>>,
  selectedBin: appType.BinInterface,
  setView: React.Dispatch<React.SetStateAction<appType.AppView>>,
  setSelectedBin: React.Dispatch<React.SetStateAction<appType.BinInterface | undefined>>,
  setRecords: React.Dispatch<React.SetStateAction<appType.RecordWithDoc[]>>
) => {
  e.stopPropagation()
  if (!selectedBin.id) throw new Error('removeBin: Error checking validating bin exists before deletiong')
  await deleteBin(selectedBin.id)
  setView('home')
  setSelectedBin(undefined)
  setRecords([]);
  const bins = await getBins();
  console.log(bins);
  setBins(bins);
}


const BinPageHeader = ({ setBins, selectedBin, setView, setSelectedBin, setRecords } : BinPageHeaderProps) => {
  return (
       <div className="grid grid-cols-10 rounded-xl bg-white p-4 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
        <span className="col-start-1 col-end 4">
          <a onClick={() => setView('home')}>Home</a>
        </span>
        <span className="col-start-9 col-end-9">
          <button onClick={(e) => removeRecords(e, selectedBin, setView, setSelectedBin, setRecords)}>
            <RiFileShredLine style={{ color: 'grey', fontSize: '24px' }} />
          </button>
        </span>
        <span className="col-start-10">
          <button onClick={(e) => removeBin(e, setBins, selectedBin, setView, setSelectedBin, setRecords)}>
            <FcReuse style={{ color: 'yellow', fontSize: '24px' }} />
          </button>
        </span>
      </div>
  )
}

export default BinPageHeader