import axios from 'axios'

const baseUrl = import.meta.env.VITE_WEBHOOK_URL
const binsUrl = baseUrl + '/bins'
const binUrl = (bin_id: string) => binsUrl + '/' + bin_id
const recordsUrl = (bin_id: string) => binUrl(bin_id) + '/records'
const recordUrl = (bin_id: string, record_id: string) => recordsUrl(bin_id) + '/' + record_id

export const getBins = async () => {
  const bins = await axios.get(baseUrl)
  return bins
}

export const createBin = async (bin_id: string) => {
  const bin = await axios.post(binUrl(bin_id))
  return bin
}

export const createRecord = async (bin_id: string) => {
  const record = await axios.post(baseUrl + '/' + bin_id)
  return record
}

export const deleteBins = async () => {
  const bins = axios.delete(binsUrl)
  return bins
}

export const deleteBin = async (bin_id: string) => {
  const bin = axios.delete(binUrl(bin_id))
  return bin
}

export const deleteRecords = async (bin_id: string) => {
  const records = axios.delete(recordsUrl(bin_id))
  return records
}

export const deleteRecord = async (bin_id: string, record_id: string) => {
  const record = axios.delete(recordUrl(bin_id, record_id))
  return record
}
