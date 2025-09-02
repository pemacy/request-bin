import { deleteBins } from '../services/webhookApi'
//import axios from 'axios'

beforeEach(() => {
  document.cookie = 'session_id=12345'
})

afterEach(async () => {
  await deleteBins()
})
