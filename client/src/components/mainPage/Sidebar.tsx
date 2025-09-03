import type { FormEvent } from 'react'
import type * as appType from '../../utils/types'
import * as api from '../../services/webhookApi'

const handleOnClick = async (
  e: FormEvent<HTMLFormElement>,
  setRecords: React.Dispatch<React.SetStateAction<appType.RecordWithDoc[]>>,
  setView: React.Dispatch<React.SetStateAction<appType.AppView>>,
  setSelectedBin: React.Dispatch<React.SetStateAction<appType.BinInterface>>
) => {
  const bin_id = e.currentTarget.id
  try {
    const records = await api.getRecords(bin_id)
    const bin = await api.getBin(bin_id)
    if (!bin) throw new Error('Form handleOnSubmit: api returned undefined')

    setSelectedBin(bin)
    setRecords(records)
    setView('bins')
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
            const id = bin.id;
            if (id === null) return null;
            const label = String(id).slice(0, 8);

            return (
              <li key={id} onClick={(e) => handleOnClick(e, setRecords, setView, setSelectedBin)}>
                <a
                  className="block px-3 py-2 rounded-md hover:bg-gray-700 hover:text-white transition"
                  href={`/${encodeURIComponent(id)}/records`}
                  title={label}
                >
                  {label}
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
