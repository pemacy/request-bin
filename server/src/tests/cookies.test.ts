import { test, expect } from 'vitest'
import request from 'supertest'
import app from '../app'

test.skip('GET /hello_world - client sets a cookie', async () => {
  const agent = request.agent(app)
  const res = await agent.get('/hello_world').set("Cookie", "hello=World")

  expect(res.statusCode).toBe(200)
  expect(res.text).toBe('hello cookie set: World')
})

test.skip('GET /hello_world - server sets a cookie', async () => {
  const agent = request.agent(app)
  let res = await agent.get('/hello_world')
  console.log("RESPONSE HEADERS:", res.headers)
  expect(res.text).toBe('No hello cookie in request')
  console.log(res.headers)

  res = await agent.get('/hello_world').set("Cookie", "hello=World")
  expect(res.text).toBe('hello cookie value: World')

  res = await agent.get('/hello_world')
  expect(res.text).toBe('hello cookie value: World')
  console.log(res.request.cookies)
})
