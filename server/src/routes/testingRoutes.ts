import express from 'express'
import * as testingController from '../controllers/testingController'

const testingRoutes = express.Router()

// Test routes
testingRoutes.get('/hello_world', testingController.helloWorld)
testingRoutes.get('/bins', testingController.showBins)
testingRoutes.get('/:bin_id', testingController.showRecords)
testingRoutes.get('/bins/new/:bin_id', testingController.createBin)
testingRoutes.get('/:bin_id/records', testingController.createRecord)

export default testingRoutes
