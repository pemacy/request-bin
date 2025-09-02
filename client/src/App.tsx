import { useState } from 'react'
import './App.css'
import BinHeader from './components/BinHeader'
import Form from './components/Form'

function App() {
  const [bins, setBins] = useState(['abc123', '321bca']);
  const [selectedBin, setSelectedBin] = useState(null);
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  return (
    <div>
      <BinHeader />
      <Form />
    </div>
  )
}

export default App
