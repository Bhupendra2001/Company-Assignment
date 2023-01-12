const express = require('express')
const mongoose = require('mongoose')
const route = require('./router')
const app = express()
app.use(express.json())


mongoose.set('strictQuery' , false)
mongoose.connect('mongodb+srv://bhupendra_:1B97GiRnjBfdXTL4@cluster5.fjlkdvr.mongodb.net/Student',{ useNewUrlParser: true})
.then(()=>console.log("Mongodb is Connected"))
.catch((err)=> console.log(err))


app.use('/', route)

app.use(function(req,res){
    res.status(404).send({status:false,message:"incorrect url"})
})

app.listen(3000,function(){
    console.log("server is started in port number is ",3000);
})