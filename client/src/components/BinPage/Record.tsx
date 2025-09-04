import { useState } from 'react'
import type { RecordComponentProps } from '../../utils/types';

const Record = ({ record }: RecordComponentProps) => {
  const [headerVisible, setHeaderVisible] = useState<boolean>(false);
  const [bodyVisible, setBodyVisible] = useState<boolean>(false);

  const handleHeaderClick = () => {
    console.log(record.headers)
    setHeaderVisible(!headerVisible);
  }

  const handleBodyClick = () => {
    setBodyVisible(!bodyVisible);
  }
  return (
    <section className="rounded-xl bg-white p-4 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
      {/* Method and Time heading information */}
      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
        [{record.method}] — {new Date(record.created_at).toLocaleString()}
      </span>

      {/* Path */}
      <div className="mt-3 rounded-lg bg-gray-50 px-3 py-2 shadow-sm dark:bg-slate-700">
        <span className="block text-lg font-medium text-gray-600 dark:text-gray-300">
          Path - /{record.bin_id}
        </span>
        {/* <p className="text-sm text-gray-800 dark:text-gray-100">{record.bin_id}</p> */}
      </div>

      {/* Headers */}
      <div
        onClick={handleHeaderClick}
        className="mt-3 cursor-pointer rounded-lg bg-gray-50 px-3 py-2 shadow-sm hover:bg-gray-100 dark:bg-slate-700 dark:hover:bg-slate-600"
      >
        <span className="block text-sm font-medium text-gray-600 dark:text-gray-300">
          {headerVisible === true ? (
            `Hide Headers`
          ) : (
            `Show Headers`
          )}
        </span>

  {headerVisible && (
    <pre className="mt-1 whitespace-pre-wrap text-xs text-gray-800 dark:text-gray-100">
      {
        JSON.stringify(record.headers, null, 2)
          .split('\n')
          .slice(1, -1)
          .join('\n')
      }
    </pre>
        )}
      </div>

      {/* Body / Payload */}
      <div
        onClick={handleBodyClick}
        className="mt-3 cursor-pointer rounded-lg bg-gray-50 px-3 py-2 shadow-sm hover:bg-gray-100 dark:bg-slate-700 dark:hover:bg-slate-600"
      >
        <span className="block text-sm font-medium text-gray-600 dark:text-gray-300">
          {bodyVisible === true ? (
            `Hide Body`
          ) : (
            `Show Body`
          )}
        </span>
        {bodyVisible && (
          <pre className="mt-1 whitespace-pre-wrap text-xs text-gray-800 dark:text-gray-100">
            {Object.entries(record.payload.body).join('\n')}
          </pre>
        )}
      </div>
    </section>
  )
}

export default Record


// Path: {record.bin_id}<br />
// Method: {record.method}<br />
// Headers: {record.headers}<br />

// {/* mongo_doc will need to be replaced with retrieved json */}
// Body: {record.payload}<br />
