import express from 'express'
import * as testingController from '../controllers/testingController'

const testingRoutes = express.Router()

// Test routes
testingRoutes.get('/', testingController.getBins)
testingRoutes.get('/hello_world', testingController.helloWorld)
testingRoutes.get('/bins', testingController.getBins)
testingRoutes.get('/bins/:bin_id', testingController.getBin)
testingRoutes.get('/bins/:bin_id/records', testingController.getRecords)
testingRoutes.post('/bins/:bin_id', testingController.createBin)
testingRoutes.post('/:bin_id', testingController.createRecord)

export default testingRoutes
