import mongoose from 'mongoose'

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('MongoDB', process.env.NODE_ENV, 'database connected')
  } catch (err) {
    console.log('MongoDB connection error:', err)
    process.exit(1)
  }
}

export default connectMongoDB
