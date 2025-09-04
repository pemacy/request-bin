import mongoose from 'mongoose'

const webhookPayloadSchema = new mongoose.Schema({
  id: String,
  payload: {},
  headers: {}
})

webhookPayloadSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete (returnedObject as any)._id
    delete (returnedObject as any).__v
  }
})

const WebhookPayload = mongoose.model('WebHookPayloads', webhookPayloadSchema)
export default WebhookPayload
