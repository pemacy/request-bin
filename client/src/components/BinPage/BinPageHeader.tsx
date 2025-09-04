import type { MouseEvent } from "react"
import { getBins, deleteBin, deleteRecords } from "../../services/webhookApi"
import type * as appType from "../../utils/types"
import type { BinPageHeaderProps } from "../../utils/types"

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
  setView('home')
  setSelectedBin(undefined)
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
       <div className="grid grid-cols-6 rounded-xl bg-white p-4 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
        <span className="col-start-1 col-end 4">
          <a onClick={() => setView('home')}>Home</a>
        </span>
        <span className="col-start-5 col-end-5">
          <a onClick={(e) => removeRecords(e, selectedBin, setView, setSelectedBin, setRecords)}>Del Records</a>
        </span>
        <span className="col-start-6">
          <a onClick={(e) => removeBin(e, setBins, selectedBin, setView, setSelectedBin, setRecords)}>Del Bin</a>
        </span>
      </div>
  )
}

export default BinPageHeader