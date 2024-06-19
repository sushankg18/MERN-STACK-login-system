import mongoose from 'mongoose'
import { DB_NAME } from '../constant.js'

const {MONGODB_URI} = process.env

const connectingMongoDb = async () =>{
    try {    
        const connectInstance = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`)
        console.log("MongoDB connect Successfully.! DB HOST : ",connectInstance.connection.host)
    } catch (error) {
        console.log(error)
    }
}

export default connectingMongoDb