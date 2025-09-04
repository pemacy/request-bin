// import React from 'react'
import Record from './Record'
import type { BinProps } from '../../utils/types'

const Bin = ({ selectedBin, records }: BinProps) => {
  return (
<div className="mb-6 text-left rounded-xl bg-white p-5 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
  {/* Info header */}
  <div className="mb-4 border-b border-gray-200 pb-3 dark:border-slate-700">
    <p className="text-sm text-gray-700 dark:text-gray-200">
      <span className="font-semibold text-gray-900 dark:text-gray-100">Bin:</span>{" "}
      {selectedBin.id}
    </p>
    <p className="text-sm text-gray-700 dark:text-gray-200">
      <span className="font-semibold text-gray-900 dark:text-gray-100">Requests:</span>{" "}
      collected at{" "}
      <span className="font-mono text-gray-800 dark:text-gray-100">
        http://www.mylink.com/{selectedBin.id}
      </span>
    </p>
    <p className="text-sm text-gray-700 dark:text-gray-200">
      <span className="font-semibold text-gray-900 dark:text-gray-100">Record Total:</span>{" "}
      {records.length}
    </p>
  </div>

  {/* Records list */}
  <div className="space-y-4">
    {records.map((record) => (
      <Record key={record.id} record={record} />
    ))}
  </div>
</div>

  )
}

export default Bin
