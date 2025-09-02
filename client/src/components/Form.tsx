import * as webhookApi from '../services/webhookApi'
import { v4 as uuidv4 } from 'uuid'
import type { FormEvent } from "react"

type Bin = {
  id: string;
  created_at: Date;
  session_id: string;
}

type FormProps = {
  setAllBins?: React.Dispatch<React.SetStateAction<Bin[]>>;
}

const handleOnSubmit = async (
  e: FormEvent<HTMLFormElement>,
  setAllBins: React.Dispatch<React.SetStateAction<Bin[]>>
) => {
  e.preventDefault()
  const formData = new FormData(e.currentTarget)
  const bin_id = String(formData.get('bin_id'))
  try {
    await webhookApi.createBin(bin_id)
    const bins = await webhookApi.getBins()
    setAllBins(bins)
  } catch (err) {
    alert('An error occurred with that bin id, try another')
  }
}

const Form = ({ setAllBins }: FormProps) => {
  if (setAllBins === undefined) throw new Error('setAllBins property is undefined')
  const bin_id = uuidv4().slice(0, 7)
  return (
    <form onSubmit={(e) => handleOnSubmit(e, setAllBins)}>
      <input type='text' value={bin_id} name='bin_id' />
      <button type='submit'>Create New Bin</button>
    </form>
  )
}

export default Form
