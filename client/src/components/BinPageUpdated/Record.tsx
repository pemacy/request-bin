// import React from 'react'
import type { RecordComponentProps } from '../../utils/types';

const Record = ({ record }: RecordComponentProps) => {
  return (
    // Display each record property
    // Research show/hide for Headers and Body
    <p>
      Path: {record.bin_id}<br />
      Method: {record.method}<br />
      Headers: {record.headers}<br />

      {/* mongo_doc will need to be replaced with retrieved json */}
      Body: {record.payload}<br />
    </p>
  )
}

export default Record
