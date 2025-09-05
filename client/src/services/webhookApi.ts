import axios from 'axios'
import type { Payload } from '../utils/types'
import { getCookie } from '../utils/helperFunctions'

const baseUrl = import.meta.env.VITE_WEBHOOK_URL
const binsUrl = baseUrl + '/bins'
const binUrl = (bin_id: string) => binsUrl + '/' + bin_id
const recordsUrl = (bin_id: string) => binUrl(bin_id) + '/records'
const recordUrl = (bin_id: string, record_id: string) => recordsUrl(bin_id) + '/' + record_id

export const getBins = async () => {
  console.log("SESSION ID", getCookie('session_id'))
  const res = await axios.get(baseUrl, { withCredentials: true })
  return res.data
}

export const getBin = async (bin_id: string) => {
  console.log(binUrl(bin_id))
  const res = await axios.get(binUrl(bin_id), { withCredentials: true })
  return res.data
}

export const getRecords = async (bin_id: string) => {
  console.log(recordsUrl(bin_id))
  const res = await axios.get(recordsUrl(bin_id), { withCredentials: true })
  return res.data
}

export const createBin = async (bin_id: string) => {
  const res = await axios.post(binUrl(bin_id), {}, { withCredentials: true })
  return res.data
}

export const createRecord = async (bin_id: string, webhookPackage: Payload) => {
  const res = await axios.post(baseUrl + '/' + bin_id, { data: webhookPackage, withCredentials: true })
  return res.data
}

export const deleteBins = async () => {
  const res = await axios.delete(binsUrl, { withCredentials: true })
  return res.data
}

export const deleteBin = async (bin_id: string) => {
  const res = await axios.delete(binUrl(bin_id), { withCredentials: true })
  return res.data
}

export const deleteRecords = async (bin_id: string) => {
  const res = await axios.delete(recordsUrl(bin_id), { withCredentials: true })
  return res.data
}

export const deleteRecord = async (bin_id: string, record_id: string) => {
  const res = await axios.delete(recordUrl(bin_id, record_id), { withCredentials: true })
  return res.data
}
