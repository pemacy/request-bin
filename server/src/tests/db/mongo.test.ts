import { test, expect } from 'vitest'
import mongoose from 'mongoose'
import GitHubPayload from '../../models/GitHubPayload'
import gitHubPayload from '../fixtures/gitHubPayload'

test.skip('Payload can be uploaded to mongo db', async () => {
  expect(typeof gitHubPayload).not.toBe('string')
  expect(typeof gitHubPayload).toBe('object')
  const gp = new GitHubPayload({ payload: gitHubPayload })

  const savedGithubPayload = await gp.save()
  const jsonPayload = savedGithubPayload.toJSON()
  expect(typeof jsonPayload.id).toBe('string')
  const githubPayloadRecords = GitHubPayload.find({})
  const totalDocs = await githubPayloadRecords.countDocuments()
  expect(totalDocs).toBe(1)
})

test.skip('Can delete many documents from GitHubPayload', async () => {
  const gp = new GitHubPayload({ payload: gitHubPayload })
  await gp.save()
  let docCount = await GitHubPayload.countDocuments()
  expect(docCount).toBeGreaterThan(0)
  await GitHubPayload.deleteMany({})
  docCount = await GitHubPayload.countDocuments()
  expect(docCount).toBe(0)
})
