import type { ModalProps } from '../../utils/types'

const Modal = ({ bin }: ModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={() => { /* allow clicking outside modal to close if needed */ }}
    >
      <div
        className="bg-white p-8 rounded-lg max-w-lg w-[90%] shadow-lg font-sans leading-relaxed text-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="mb-4 text-lg font-semibold border-b border-gray-200 pb-2">
          Created
        </h1>
        <div>
          Basket '{bin.id}' has been successfully created!
        </div>
        <div className="mt-2 p-2 bg-gray-100 rounded font-mono text-sm break-words">
          Your token is: {bin.id}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 rounded border border-gray-300 bg-gray-100 text-sm hover:bg-gray-200"
          >
            Close
          </button>
          <button
            className="px-4 py-2 rounded border border-blue-600 bg-blue-600 text-white text-sm hover:bg-blue-700"
            onClick={() => window.open(bin.id, "_blank")}
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

