// import React from 'react'
import type { BinComponentProps } from '../../utils/types'
import Bin from './Bin'


const BinPageContent = ({ selectedBin, records } : BinComponentProps) => {
  return (
    <div>
      <br />
      Bin: {selectedBin.id} ---------------------- requests: {records.length}<br />
      <br />

      {/* Pass array of records into Bin component if length > 0 */}
      {records.length > 0 ? (
        <Bin selectedBin={selectedBin} records={records}/>
      ) : (

      // If `records` array is empty, display empty bin message
        <p>Empty Bin Use http://www.mylink.com/{selectedBin.id}</p>    
      )}
    </div>
  )
}

export default BinPageContent
