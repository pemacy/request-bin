import type { MouseEvent } from 'react'
import type * as appType from '../../utils/types'
import { getBin } from '../../services/webhookApi'

const goToMainPage = (
  e: MouseEvent<HTMLDivElement>,
  setView: React.Dispatch<React.SetStateAction<appType.AppView>>,
) => {
  e.stopPropagation()
  setView('home')
}

const goToBinPage = async (
  e: MouseEvent<HTMLButtonElement>,
  setView: React.Dispatch<React.SetStateAction<appType.AppView>>,
  setSelectedBin: React.Dispatch<React.SetStateAction<appType.BinInterface | undefined>>
) => {
  e.stopPropagation()
  const bin_id = e.currentTarget.dataset.binId
  if (!bin_id) throw new Error('goToBinPage: data-bin-id undefined on Open Basket button')
  const bin = await getBin(bin_id)
  setView('bins')
  setSelectedBin(bin)
}

const Modal = ({ selectedBin, setView, setSelectedBin }: appType.ModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={(e) => goToMainPage(e, setView)}
    >
      <div
        className="bg-white p-8 rounded-lg max-w-lg w-[90%] shadow-lg font-sans leading-relaxed text-gray-800"
        onClick={(e) => goToMainPage(e, setView)}
      >
        <h1 className="mb-4 text-lg font-semibold border-b border-gray-200 pb-2">
          Created
        </h1>
        <div>
          Basket '{selectedBin.id}' has been successfully created!
        </div>
        <div className="mt-2 p-2 bg-gray-100 rounded font-mono text-sm break-words">
          Your token is: {selectedBin.id}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 rounded border border-gray-300 bg-gray-100 text-sm hover:bg-gray-200"
          >
            Close
          </button>
          <button
            className="px-4 py-2 rounded border border-blue-600 bg-blue-600 text-white text-sm hover:bg-blue-700"
            data-bin-id={selectedBin.id}
            onClick={(e) => goToBinPage(e, setView, setSelectedBin)}
          >
            Open Basket
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

/*

BACK END:

  const [open, setOpen] = useState(true);

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      {open && (
        <Modal
          bin={{
            UUIDv4: "c103d77e-0593-40b3-a07a-0cdf7418c630",
            auth_token: "_RUxATXAvHPVYVdw_L6PHezY7QUo9RWrs-zvf6CryDwa",
            url: "https://example.com"
          }}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );

*/

