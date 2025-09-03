import { useState, useEffect } from 'react'
import './App.css'
import BinHeader from './components/BinHeader'
import Form from './components/Form'
import type { BinInterface } from './types/types.ts'
import Sidebar from './components/Sidebar'
import * as webhookApi from './services/webhookApi'
import type { Bin, RecordWithDoc } from './utils/types'

function App() {
  const [bins, setBins] = useState<BinInterface[]>([]);
  const [selectedBin, setSelectedBin] = useState<Bin>();
  const [records, setRecords] = useState<RecordWithDoc[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<RecordWithDoc>();


  useEffect(() => {
    const fetchBins = async () => {
      const bins = await webhookApi.getBins()
      setBins(bins)
    }

    fetchBins()
  }, [])
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row">
      {/* Form: 3/4 width on medium+ screens */}
      <main className="flex-[3] w-full p-6 md:p-10">
        <h1 className="text-2xl font-semibold mb-6">Create a New Bin</h1>
        {import.meta.env.VITE_WEBHOOK_URL}
        <Form setBins={setBins} />
      </main>

      {/* Sidebar: 1/4 width on medium+ screens */}
      <aside className="flex-[1] w-full md:w-auto border-t md:border-t-0 md:border-l border-gray-700 bg-gray-800">
        <Sidebar bins={bins} />
      </aside>
    </div>
  );
}

export default App
