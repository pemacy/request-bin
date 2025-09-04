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
  const [records, setRecords] = useState<RecordWithDoc[] | []>([]);


  useEffect(() => {
    const fetchBins = async () => {
      const bins = await webhookApi.getBins()
      setBins(bins)
    }

    fetchBins()
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 rounded-lg text-white flex flex-col md:flex-row">

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
        <Modal 
          bin={selectedBin}
          setView={setView}
          setSelectedBin={setSelectedBin}
          setRecords={setRecords} />
      )}

      {/* Bin records view */}
      {view === 'bins' && selectedBin &&
      <div className="flex-1 flex justify-center">
  <div className="w-full max-w-5xl bg-gray dark:bg-gray-900 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
        <BinPage setBins={setBins} selectedBin={selectedBin} records={records} setView={setView} setSelectedBin={setSelectedBin} setRecords={setRecords} />
        </div>
        </div>
      }

      {/* <BinPage selectedBin={selectedBin} records={records}/> */}
    </div>
  );
}

export default App
