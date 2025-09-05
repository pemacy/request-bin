// import React from 'react'
import { useEffect } from 'react'
import BinPageHeader from './BinPageHeader'
import BinPageContent from './BinPageContent'
import type { BinPageProps, RecordWithDoc } from '../../utils/types'

const BinPage = ({ setBins, selectedBin, records, setView, setSelectedBin, setRecords }: BinPageProps) => {

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    ws.onmessage = (event) => {
      const record: RecordWithDoc = JSON.parse(event.data);

      setRecords((prev) => {
        if (record.bin_id === selectedBin.id) {
          return [...prev, record];
        }
        return prev;
      });
    };

    return () => ws.close(); // closes socket when component unmounts
  }, [selectedBin])
  return (
    <div className="bg-gray dark:bg-gray-900 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
      <header className="w-full bg-gray-800 dark:bg-gray-900 shadow-md rounded-b-xl p-6 flex justify-center items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white dark:text-gray-100 tracking-wide">
          {selectedBin.id}
        </h1>
      </header>
      <BinPageHeader setBins={setBins} selectedBin={selectedBin} setView={setView} setSelectedBin={setSelectedBin} setRecords={setRecords} />
      <BinPageContent selectedBin={selectedBin} records={records} />

    </div>
  )
}

export default BinPage
