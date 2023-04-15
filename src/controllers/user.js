const userModel = require('../models/model')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const register = async (req, res)=>{
    try{
     let users = req.body
     let { fname , lname , email, password} = users
     if(!fname ) return res.status(400).send({status : false , message : "please enter fname ?"})
     if(!lname ) return res.status(400).send({status : false , message : "please enter lname ?"})
     if(!email ) return res.status(400).send({status : false , message : "please enter email ?"})
     if(!password ) return res.status(400).send({status : false , message : "please enter password ?"})

    let saveData =  await userModel.create(users)
     return res.status(201).send({status: true , data : saveData})

    }catch(err){
        return res.stauts(500).send({status: false , message : err.message})
    }
}

const login = async (req, res)=>{
    try{
    let email = req.body.email
    let password = req.body.password
    if(!email) return res.stauts(400).send({status : false, message : "please enter email ?"})
    if(!password) return res.stauts(400).send({status : false, message : "please enter password ?"})

    let checkuser = await userModel.findOne({email,password})
    if(!checkuser)   return   res.status(404).send({status : false , message: "invalid email or password"})


    let token =  jwt.sign({
        userId : checkuser._id,
        email : checkuser.email,
        password : checkuser.password
    }, process.env.AuthKey)
    return  res.status(201).send({status: true ,Token: token})

    }catch(err){
        return res.stauts(500).send({status: false , message : err.message})
    }
}

module.exports = { login , register}
