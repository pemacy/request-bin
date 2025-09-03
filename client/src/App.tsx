import { useState } from 'react'
import './App.css'
import BinHeader from './components/BinHeader'
import Form from './components/Form'
import type { BinInterface } from './types/types.ts'

function App() {
  const [bins, setBins] = useState(['abc123', '321bca']);
  const [selectedBin, setSelectedBin] = useState(null);
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [allBins, setAllBins] = useState<BinInterface[]>([]);

  return (
    <div>
      <BinHeader />
      <Form setAllBins={setAllBins}/>
    </div>
  )
}

export default App
