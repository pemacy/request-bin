import * as webhookApi from '../services/webhookApi'

test.skip('getBins', async () => {
  const res = await webhookApi.getBins()
  const bins = res.data.bins
  expect(bins.length).toBe(0)
})

test.skip('createBin - no session_id cookie', async () => {
  document.cookie = ''
  const binId = 'abc123'
  const createBinRes = await webhookApi.createBin(binId)
  const createdBin = createBinRes.data
  const binsRes = await webhookApi.getBins()
  const storedBin = binsRes.data.bins[0]
  expect(createdBin.id).toBe(storedBin.id)
  expect(typeof createdBin.session_id).toBe('string')
  expect(storedBin.id).toBe(binId)
})

test.skip('createBin - with session cookie', async () => {
  const binId = 'abc123'
  const createBinRes = await webhookApi.createBin(binId)
  const createdBin = createBinRes.data
  const binsRes = await webhookApi.getBins()
  const storedBin = binsRes.data.bins[0]
  expect(createdBin.id).toBe(storedBin.id)
  expect(createdBin.session_id).toBe('12345')
  expect(storedBin.id).toBe(binId)
})

test('createRecord', async () => {
  const binId = 'abc123'
  const createBinRes = await webhookApi.createBin(binId)
  const bin = createBinRes.data
  console.log(bin)
  const createRecordRes = await webhookApi.createRecord(binId)
  const record = createRecordRes.data
  console.log(record)
})


