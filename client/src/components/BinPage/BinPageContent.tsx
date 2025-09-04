// import React from 'react'
import type { BinComponentProps } from '../../utils/types'
import Bin from './Bin'

const BinPageContent = ({ selectedBin, records } : BinComponentProps) => {

  return (
<div className="mb-4 rounded-xl bg-white p-4 shadow-md outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
  {/* Bin + requests info */}
  <div className="text-sm text-gray-700 dark:text-gray-200">
    <span className="font-semibold text-gray-900 dark:text-gray-100">
      Bin:
    </span>{" "}
    {selectedBin.id}
    <span className="mx-3 text-gray-400">|</span>
    <span className="font-semibold text-gray-900 dark:text-gray-100">
      Requests:
    </span>{" "}
    {records.length}
  </div>

  {/* Content below */}
  <div className="mt-3">
    {records.length > 0 ? (
      <Bin selectedBin={selectedBin} records={records} />
    ) : (
      <p className="text-sm italic text-gray-500 dark:text-gray-400">
        Empty Bin — use{" "}
        <span className="font-mono text-gray-700 dark:text-gray-200">
          http://www.mylink.com/{selectedBin.id}
        </span>
      </p>
    )}
  </div>
</div>

  )
}

export default BinPageContent
