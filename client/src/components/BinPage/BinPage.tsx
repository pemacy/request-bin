// import React from 'react'
import BinPageHeader from './BinPageHeader'
import BinPageContent from './BinPageContent'
import type { BinComponentProps } from '../../utils/types'

const BinPage = ({ bin, records } : BinComponentProps) => {
  return (
    <div className="bg-gray dark:bg-gray-900 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
      <BinPageHeader />
      <BinPageContent bin={bin} records={records}/>

    </div>
  )
}

export default BinPage