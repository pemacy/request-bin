import express from 'express'
import * as testingController from '../controllers/testingController'

const testingRoutes = express.Router()

// Test routes
testingRoutes.get('/', testingController.getBins)
testingRoutes.get('/hello_world', testingController.helloWorld)
testingRoutes.get('/bins', testingController.getBins)
testingRoutes.get('/:bin_id', testingController.getRecords)
testingRoutes.get('/bins/new/:bin_id', testingController.createBin)
testingRoutes.get('/:bin_id/records', testingController.createRecord)

export default testingRoutes
