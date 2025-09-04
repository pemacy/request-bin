import { useState, useEffect } from 'react'
import './App.css'
import Form from './components/MainPage/Form'
import Sidebar from './components/MainPage/Sidebar'
import Modal from './components/MainPage/Modal'
import BinPage from './components/BinPage/BinPage'
import type { RecordWithDoc, BinInterface, AppView } from './utils/types'
import * as webhookApi from './services/webhookApi'

function App() {
  const [view, setView] = useState<AppView>('home'); // controls which components are visible
  const [bins, setBins] = useState<BinInterface[]>([]);
  const [selectedBin, setSelectedBin] = useState<BinInterface | undefined>();
  const [records, setRecords] = useState<RecordWithDoc[]>([]);


  useEffect(() => {
    const fetchBins = async () => {
      const bins = await webhookApi.getBins()
      setBins(bins)
    }

    fetchBins()
  }, [])

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");

    ws.onmessage = (event) => {
      const record: RecordWithDoc = JSON.parse(event.data);

      if (selectedBin && record.bin_id === selectedBin.id) {
        setRecords((prev) => [...prev, record]);
      }
    };
  }, [selectedBin])

  return (
    <div className="min-h-screen bg-gray-900 rounded-lg text-white flex flex-col md:flex-row">
      <p>{view}</p>
      {(view === 'home' || view === 'modal') && (
        <>
          <main className="flex-[3] w-full p-6 md:p-10">
            <h1 className="text-2xl font-semibold mb-6">Create a New Bin</h1>
            {import.meta.env.VITE_WEBHOOK_URL}
            <Form
              setBins={setBins}
              setView={setView}
              setRecords={setRecords}
              setSelectedBin={setSelectedBin}
            />
          </main>

          <aside className="flex-[1] w-full md:w-auto border-t md:border-t-0 md:border-l border-gray-700 bg-gray-800">
            <Sidebar
              bins={bins}
              setRecords={setRecords}
              setView={setView}
              setSelectedBin={setSelectedBin}
            />
          </aside>

        </>
      )}

      {/* Modal */}
      {view === 'modal' && selectedBin && (
        <Modal selectedBin={selectedBin} setView={setView} setSelectedBin={setSelectedBin} />
      )}

      {/* Bin records view */}
      {view === 'bins' && selectedBin &&
        <BinPage selectedBin={selectedBin} records={records} setView={setView}/>
      }

      {/* <BinPage selectedBin={selectedBin} records={records}/> */}
    </div>
  );
}

export default App
