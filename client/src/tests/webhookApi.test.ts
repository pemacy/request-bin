import * as webhookApi from '../services/webhookApi'

test('getBins', async () => {
  const bins = await webhookApi.getBins()
  expect(bins.length).toBe(0)
})

test('createBin - no session_id cookie', async () => {
  document.cookie = ''
  const binId = 'abc123'
  const createdBin = await webhookApi.createBin(binId)
  const bins = await webhookApi.getBins()
  const storedBin = bins[0]
  expect(createdBin.id).toBe(storedBin.id)
  expect(typeof createdBin.session_id).toBe('string')
  expect(storedBin.id).toBe(binId)
})

test('createBin - with session cookie', async () => {
  const binId = 'abc123'
  const createdBin = await webhookApi.createBin(binId)
  const bins = await webhookApi.getBins()
  const storedBin = bins[0]
  expect(createdBin.id).toBe(storedBin.id)
  expect(createdBin.session_id).toBe('12345')
  expect(storedBin.id).toBe(binId)
})

test('createRecord', async () => {
  const binId = 'abc123'
  await webhookApi.createBin(binId)

  const pkg = { a: 1 }
  const record = await webhookApi.createRecord(binId, pkg)
  console.log(record)
  expect(record.bin_id).toBe(binId)
})

test('getRecords', async () => {
  const binId = 'abc123'
  await webhookApi.createBin(binId)
  const pkg = { a: 1 }
  await webhookApi.createRecord(binId, pkg)
  await webhookApi.createRecord(binId, pkg)

  const records = await webhookApi.getRecords(binId)
  expect(records.length).toBe(2)
})

test('deleteBin', async () => {
  const binId = 'abc123'
  await webhookApi.createBin(binId)
  let bins = await webhookApi.getBins()
  expect(bins.length).toBe(1)
  await webhookApi.deleteBin(binId)
  bins = await webhookApi.getBins()
  expect(bins.length).toBe(0)
})

test('deleteBins', async () => {
  const binId1 = 'abc123'
  const binId2 = 'def456'
  await webhookApi.createBin(binId1)
  await webhookApi.createBin(binId2)

  let bins = await webhookApi.getBins()
  expect(bins.length).toBe(2)
  await webhookApi.deleteBins()
  bins = await webhookApi.getBins()
  expect(bins.length).toBe(0)
})

test('deleteRecords', async () => {
  const binId = 'abc123'
  await webhookApi.createBin(binId)

  const pkg = { a: 1 }
  await webhookApi.createRecord(binId, pkg)

  let records = await webhookApi.getRecords(binId)
  expect(records.length).toBe(1)
  await webhookApi.deleteRecords(binId)
  records = await webhookApi.getRecords(binId)
  expect(records.length).toBe(0)
})
