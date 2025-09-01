import mongoose from 'mongoose'

const connectMongoDB = async () => {
  try {
    if (process.env.MONGO_URL === undefined) throw new Error('connectMongoDB: MONGO_URL env not defined')
    if (process.env.MONGO_DATABASE === undefined) throw new Error('connectMongoDB: MONGO_DB_NAME env not defined')

    await mongoose.connect(process.env.MONGO_URL)
    console.log('MongoDB', process.env.NODE_ENV, 'database connected:', process.env.MONGO_DATABASE)
  } catch (err) {
    console.log('MongoDB connection error:', err)
    process.exit(1)
  }
}

export default connectMongoDB
