const express=require('express')
require('dotenv').config()
const cors=require('cors')
const {dbConnection}=require('./config/db')
const userRoutes=require('./routes/userRoutes')
const app=express()

dbConnection()
app.use(cors())

app.use(express.json())

app.use('/api/v1',userRoutes)


app.listen(process.env.PORT,()=>{
    console.log(`port is listening at ${process.env.PORT}`)
})