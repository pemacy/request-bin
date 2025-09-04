// import React from 'react'
import BinPageHeader from './BinPageHeader'
import BinPageContent from './BinPageContent'
import type { BinPageProps } from '../../utils/types'

const BinPage = ({ setBins, selectedBin, records, setView, setSelectedBin, setRecords} : BinPageProps) => {
  return (
    <div className="bg-gray dark:bg-gray-900 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
      <BinPageHeader setBins={setBins} selectedBin={selectedBin} setView={setView} setSelectedBin={setSelectedBin} setRecords={setRecords} />
      <BinPageContent selectedBin={selectedBin} records={records}/>

    </div>
  )
}

export default BinPage