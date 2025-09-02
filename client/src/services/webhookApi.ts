import axios from 'axios'

const baseUrl = import.meta.env.VITE_WEBHOOK_URL
const binsUrl = baseUrl + '/bins'
const binUrl = (bin_id: string) => binsUrl + '/' + bin_id
const recordsUrl = (bin_id: string) => binUrl(bin_id) + '/records'
const recordUrl = (bin_id: string, record_id: string) => recordsUrl(bin_id) + '/' + record_id

export const getBins = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export const getRecords = async (bin_id: string) => {
  const res = await axios.get(recordsUrl(bin_id))
  return res.data
}

export const createBin = async (bin_id: string) => {
  const res = await axios.post(binUrl(bin_id))
  return res.data
}

interface WebhookPackage {
  [key: string]: any;
}

export const createRecord = async (bin_id: string, webhookPackage: WebhookPackage) => {
  const res = await axios.post(baseUrl + '/' + bin_id, { data: webhookPackage })
  return res.data
}

export const deleteBins = async () => {
  const res = await axios.delete(binsUrl)
  return res.data
}

export const deleteBin = async (bin_id: string) => {
  const res = await axios.delete(binUrl(bin_id))
  return res.data
}

export const deleteRecords = async (bin_id: string) => {
  const res = await axios.delete(recordsUrl(bin_id))
  return res.data
}

export const deleteRecord = async (bin_id: string, record_id: string) => {
  const res = await axios.delete(recordUrl(bin_id, record_id))
  return res.data
}
