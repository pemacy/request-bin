// import React from 'react'
import Record from './Record'
import type { BinProps } from '../../utils/types'

const Bin = ({ selectedBin, records }: BinProps) => {
  return (
    <div>
      {/* Info about the current Bin and its records */}
      <p>
        Bin: {selectedBin.id}<br />
        Requests are collected at http://www.mylink.com/{selectedBin.id}<br />
        Record Total: {records.length}
      </p>

      {/* Map each record to pass into individual Record component */}
      {records.map(record => <Record key={record.id} record={record} />)}
    </div>
  )
}

export default Bin
