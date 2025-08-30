import mongoose from 'mongoose'

const gitHubPayloadSchema = new mongoose.Schema({
  id: String,
  content: String,
})

gitHubPayloadSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete (returnedObject as any)._id
    delete (returnedObject as any).__v
  }
})

const gitHubPayload = mongoose.model('GitHubPayload', gitHubPayloadSchema)
export default gitHubPayload
