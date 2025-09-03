import { useState, useEffect } from 'react'
import './App.css'
import BinHeader from './components/BinHeader'
import Form from './components/Form'
import * as webhookApi from './services/webhookApi'

function App() {
  const [bins, setBins] = useState(['abc123', '321bca']);
  const [selectedBin, setSelectedBin] = useState(null);
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const fetchBins = async () => {
      const bins = await webhookApi.getBins()
      setBins(bins)
    }

    fetchBins()
  }, [])

  return (
    <div>
      <BinHeader />
      <Form />
      <Sidebar />
    </div>
  )
}

export default App
