// import React from 'react'

const Record = ({ record }) => {
  return (
    // Display each record property
    // Research show/hide for Headers and Body
    <p>
      Path: {record.path}<br />
      Method: {record.method}<br />
      Headers: {record.headers}<br />

      {/* mongo_doc will need to be replaced with retrieved json */}
      Body: {record.mongo_doc}<br />
    </p>
  )
}

export default Record