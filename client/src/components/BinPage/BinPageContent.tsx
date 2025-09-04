// import React from 'react'
import type { BinComponentProps } from '../../utils/types'
import Bin from './Bin'

const BinPageContent = ({ bin, records } : BinComponentProps) => {
  return (
    <div>
      <br />
      Bin: {bin.id} ---------------------- requests: {records.length}<br />
      <br />
    
      {/* Pass array of records into Bin component if length > 0 */}
      {records.length > 0 ? (
        <Bin bin={bin} records={records}/>
      ) : (

      
      // If `records` array is empty, display empty bin message
        <p>Empty Bin Use http://www.mylink.com/{bin.id}</p>    
      )}
    </div>
  )
}

export default BinPageContent