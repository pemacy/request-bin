import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BinHeader from './components/BinHeader'

function App() {
  const [bins,           setBins]           = useState(['abc123', '321bca']);
  const [selectedBin,    setSelectedBin]    = useState(null);
  const [records,        setRecords]        = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  return (
    <div>
      <BinHeader />
    </div>
  )
}

export default App
