const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
require('dotenv').config()
const route = require('./routes')
mongoose.connect( process.env.MongoURL,{useNewUrlParser : true})
.then(()=>console.log("mongodb connected"))
.catch((err)=>console.log(err.message))

app.use('/', route)

app.use('*', (req, res)=>{
return res.status(400).send("you provide wrond url")
})

app.listen(process.env.PORT, ()=>{
    console.log('server is started in port '+ process.env.PORT)
})