import { useState, useEffect } from 'react'
import './App.css'
import BinHeader from './components/BinHeader'
import Form from './components/Form'
import Sidebar from './components/Sidebar'
import * as webhookApi from './services/webhookApi'
import type { Bin, RecordWithDoc } from './utils/types'

function App() {
  const [bins, setBins] = useState<Bin[]>([]);
  const [selectedBin, setSelectedBin] = useState<Bin>();
  const [records, setRecords] = useState<RecordWithDoc[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<RecordWithDoc>();

  //useEffect(() => {
  //  const fetchBins = async () => {
  //    const bins = await webhookApi.getBins()
  //    setBins(bins)
  //  }
  //
  //  fetchBins()
  //}, [])

  return (
    <div>
      <BinHeader />
      <Form setBins={setBins} />
      <Sidebar bins={bins} />
    </div>
  )
}

export default App
