
const jwt = require("jsonwebtoken")
const userModel = require('./models/model')
require('dotenv').config()


exports.Authentication = async (req,res,next)=>{
    try{
        let token = req.headers['authorization'] //Authorization
        if(!token)  return res.status(400).send({ status : false , msg: "headers must be present" }) 
       token = token.slice(7)
        jwt.verify(token, process.env.AuthKey ,(err, data)=>{
            if(err){
                return res.status(401).send({status : false, message : "your are not authenticated person"})
            }else{
                req.userId = data.userId
                next()
            }
        } )

    }catch(err){
        return res.status(500).send({status : false , message : err.message})
    }
}

  exports.Authorization = async (req,res,next)=>{
    try{
     const userID = req.userId
     if(!userID) return res.status(400).send({ status: false, message: " userId  not present in token" })

     let userdata = await userModel.findOne({_id : userID})
     if (!userdata) return res.status(404).send({ status: false, message: "User Not found" })
   
     if(!userdata.admin) return res.status(403).send({ status: false, message: "You are not Authrize User" })

     next()
    }catch(err){
        return res.status(500).send({status : false , message : err.message})
    }
}