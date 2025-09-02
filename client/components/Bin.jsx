// import React from 'react'
import Record from './Record'

const Bin = ({ bin, records }) => {
  return (
    <div>
      {/* Info about the current Bin and its records */}
      <p>
        Bin: {bin}<br />
        Requests are collected at http://www.mylink.com/{bin}<br />
        Record Total: {records.length} 
      </p>

      {/* Map each record to pass into individual Record component */}
      {records.map(record => <Record key={record.id} record={record} />)}
    </div>
  )
}

export default Bin