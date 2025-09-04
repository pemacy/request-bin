import type { MouseEvent } from 'react'
import type * as appType from '../../utils/types'
import * as api from '../../services/webhookApi'

const handleOnClick = async (
  e: MouseEvent<HTMLLIElement>,
  setRecords: React.Dispatch<React.SetStateAction<appType.RecordWithDoc[]>>,
  setView: React.Dispatch<React.SetStateAction<appType.AppView>>,
  setSelectedBin: React.Dispatch<React.SetStateAction<appType.BinInterface | undefined>>
) => {
  e.preventDefault()
  const bin_id = e.currentTarget.dataset.binId
  if (!bin_id) throw new Error('handleOnClick - list item does not have data-bin-id attribute')
  try {
    const records = await api.getRecords(bin_id)
    const bin = await api.getBin(bin_id)
    if (!bin) throw new Error('Form handleOnSubmit: api returned undefined')

    setSelectedBin(bin)
    setRecords(records)
    setView('bins')
    console.log('BINS VIEW SET')
    console.log('BIN === ', bin)
  } catch (err) {
    console.log('There was an error', err)
  }
}

const Sidebar = ({ bins, setRecords, setView, setSelectedBin }: appType.SidebarProps) => {
  console.log(bins)
  return (
    <nav className="h-full flex flex-col">
      <div className="px-4 py-3 text-lg font-semibold border-b border-gray-700">
        Bins
      </div>

      {bins.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          No bins yet
        </div>
      ) : (
        <ul className="flex-1 overflow-y-auto p-4 space-y-2">
          {bins.map((bin) => {
            if (bin.id === null) return null;

            return (
              <li key={bin.id}
                onClick={(e) => handleOnClick(e, setRecords, setView, setSelectedBin)}
                data-bin-id={bin.id}
              >
                <a
                  className="block px-3 py-2 rounded-md hover:bg-gray-700 hover:text-white transition"
                  href={`/${encodeURIComponent(bin.id)}`}
                >
                  {bin.id}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
};

export default Sidebar;
