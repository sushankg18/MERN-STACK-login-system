import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express()

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
}))

app.use(cookieParser());
app.use(express.json())


import useRouter from '../src/routes/user.router.js'

app.use('/api/v1/users', useRouter)
export {app}