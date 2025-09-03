// import React from 'react'
import type { BinHeaderProps } from '../../utils/types';
import Bin from './Bin'

// Will change to below when actual props are passed from App component
// const BinHeader = ({ bin, records })
const BinHeader = ({ bin, records }: BinHeaderProps) => {
  return (
    <>
      {/* Header for main Bin page */}
      <p>BinHeader - buttons top right (refresh, delete all records, delete bin, etc)</p>

      {/* Pass array of records into Bin component if length > 0 */}
      {records.length > 0 ? (
        <Bin bin={bin} records={records} />
      ) : (

        // If `records` array is empty, display empty bin message
        <p>Empty Bin Use http://www.mylink.com/{bin.id}</p>
      )}


    </>
  )
}

export default BinHeader

//const bin = 'abc123';
//const records = [
//  {
//    id: 9,
//    method: 'POST',
//    headers: '{"content-type":"application/json","user-agent":"PostmanRuntime/7.45.0","accept":"*/*","postman-token":"b9ba0255-7760-4f9e-bb60-c81f3561aad9","host":"localhost:3000","accept-encoding":"gzip, deflate, br","connection":"keep-alive","content-length":"8851"}',
//    path: '/abc123',
//    time: '2025-08-31T18:19:14.285Z',
//    server_time: null,
//    mongo_doc: '68b4922222199c1425965f58',
//    bin_id: 4
//  },
//  {
//    id: 10,
//    method: 'POST',
//    headers: '{"content-type":"application/json","user-agent":"PostmanRuntime/7.45.0","accept":"*/*","postman-token":"6f52c887-472c-4e0d-ba7c-cb8db4a36a56","host":"localhost:3000","accept-encoding":"gzip, deflate, br","connection":"keep-alive","content-length":"8851"}',
//    path: '/321bca',
//    time: '2025-08-31T18:19:25.734Z',
//    server_time: null,
//    mongo_doc: '68b4922d903eac82817c2020',
//    bin_id: 4
//  },
//  {
//    id: 11,
//    method: 'POST',
//    headers: '{"content-type":"application/json","user-agent":"PostmanRuntime/7.45.0","accept":"*/*","postman-token":"c8ab5930-5593-9a4b-ee87-f63c8139ddb0","host":"localhost:3000","accept-encoding":"gzip, deflate, br","connection":"keep-alive","content-length":"8851"}',
//    path: '/abc123',
//    time: '2025-08-31T20:45:36.486Z',
//    server_time: null,
//    mongo_doc: '68b4922857395ab49274b571',
//    bin_id: 4
//  },
//]
//
