// import React from 'react'
import BinPageHeader from './BinPageHeader'
import BinPageContent from './BinPageContent'
import type { BinPageProps } from '../../utils/types'

const BinPage = ({ selectedBin, records, setView} : BinPageProps) => {
  return (
    <div className="bg-gray dark:bg-gray-900 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
      <BinPageHeader setView={setView} />
      <BinPageContent selectedBin={selectedBin} records={records}/>

    </div>
  )
}

export default BinPage