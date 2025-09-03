// import React from 'react'
import Record from './Record'
import type { BinComponentProps } from '../../utils/types'

const Bin = ({ bin, records }: BinComponentProps) => {
  return (
    <div>
      {/* Info about the current Bin and its records */}
      <p>
        Bin: {bin.id}<br />
        Requests are collected at http://www.mylink.com/{bin.id}<br />
        Record Total: {records.length}
      </p>

      {/* Map each record to pass into individual Record component */}
      {records.map(record => <Record key={record.id} record={record} />)}
    </div>
  )
}

export default Bin
