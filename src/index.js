import dotenv from 'dotenv'
import connectingMongoDb from './db/index.db.js'
import { app } from './app.js'
dotenv.config({path : "./env"})

connectingMongoDb()
.then(app.listen(process.env.PORT || 3000 , ()=>{
    console.log("APP IS NOW RUNNING ON PORT ", process.env.PORT || 3000 )  
}))
.catch(
    (error)=>{
        console.log("Error while connecting to MongoDB ",error)
    }
)
