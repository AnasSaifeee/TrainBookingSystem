const express= require('express')
const app=express()
const connection = require('./db')
const cors = require('cors')
const userroutes = require('./routes/users')

connection()
//middleware
app.use(express.json())
app.use(cors())

app.use('/',userroutes)

app.listen(process.env.PORT,()=>{
    console.log("app is listening on 4000")
})