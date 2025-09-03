import * as webhookApi from '../services/webhookApi'
import { v4 as uuidv4 } from 'uuid'
import type { FormEvent } from "react"

type Bin = {
  id: string;
  created_at: Date;
  session_id: string;
}

type FormProps = {
  setBins?: React.Dispatch<React.SetStateAction<Bin[]>>;
}

const handleOnSubmit = async (
  e: FormEvent<HTMLFormElement>,
  setBins: React.Dispatch<React.SetStateAction<Bin[]>>
) => {
  e.preventDefault()
  const formData = new FormData(e.currentTarget)
  const bin_id = String(formData.get('bin_id'))
  try {
    await webhookApi.createBin(bin_id)
    const bins = await webhookApi.getBins()
    setBins(bins)
  } catch (err) {
    alert('An error occurred with that bin id, try another')
  }
}

const Form = ({ setBins }: FormProps) => {
  if (!setBins) throw new Error('setAllBins property is undefined');

  const bin_id = uuidv4().slice(0, 7);

  return (
    <form
      onSubmit={(e) => handleOnSubmit(e, setBins)}
      className="max-w-md bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-md space-y-4"
    >
      <fieldset className="flex flex-col space-y-1">
        <label htmlFor="bin_id" className="text-sm font-medium text-gray-300">
          Bin Name
        </label>
        <input
          type="text"
          value={bin_id}
          name="bin_id"
          className="bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-600"
          readOnly
        />
      </fieldset>
      <button
        type="submit"
        className="w-full py-2 bg-sky-700 hover:bg-sky-600 rounded-md font-medium transition"
      >
        Create New Bin
      </button>
    </form>
  );
};

export default Form
