import express from 'express'
import cors from "cors"
import { connectDB } from './config/db.js'
import busrouter from './routes/busroute.js'
import Routerouter from './routes/Routeroute.js'
import userRouter from './routes/userroute.js'
import bookrouter from './routes/bookingroute.js'
import adminRouter from './routes/adminroute.js'
import 'dotenv/config'

//app config
const app=express()
const port=process.env.PORT

//middleware 
app.use(express.json())
app.use(cors())

//db connection
connectDB();

// api endpoints
app.use("/api/bus",busrouter)
app.use("/api/route",Routerouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/booking",bookrouter)
app.use("/api/admin",adminRouter)

app.get("/",(req,res)=>{
    res.send("API WORKING")
})


app.listen(port,'0.0.0.0', ()=>{
    console.log(`Server Started on http://localhost:${port}`)
})