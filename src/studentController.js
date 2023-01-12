const studentModel = require('./studentModel')
const jwt = require('jsonwebtoken')


const create_Student =  async (req, res)=>{

    try{
  
        let data = req.body
        let { Name ,Subject , Marks} = data
        if(!Name) return res.status(400).send({ status : false ,message : "please provide Name"})
        if(!Subject) return res.status(400).send({ status : false ,message : "please provide Subject"})
        if(!Marks) return res.status(400).send({ status : false ,message : "please provide Marks"})

        if (!/^[a-zA-Z\s\.]*$/.test(Name)) return res.status(400).send({ status : false ,message : "please provide  valid Name"})
        if (!/^[a-zA-Z\s\.]*$/.test(Subject)) return res.status(400).send({ status : false ,message : "please provide valid Subject"})
        if (!/^\d+$/.test(Marks)) return res.status(400).send({ status : false ,message : "please provide valid Marks"})

        let find_data = await studentModel.findOneAndUpdate({Name , Subject}, {$inc : {Marks :  Marks}}, {new : true})
        if(!find_data) {
            let student = await studentModel.create(data)
            return res.status(201).send({ message : "student created successfully", data : student})
        }
        return res.status(201).send({status: true, message : "student created successfully", data : find_data})
    }catch(err)
    {
        return res.status(500).send({status : false , message : err.message})
    }
}




const login = async (req, res)=>{

    try{
 
        let data = req.body
        let { Name ,Subject} = data

        if(!Name) return res.status(400).send({ status : false , message : "please provide Name"})
        if(!Subject) return res.status(400).send({ status : false , message : "please provide Subject"})

        let found = await studentModel.findOne({Name , Subject})
        if(!found) return res.status(404).send({status : false , message : "No data found " })

        let payload = {
          Name : found.Name,
          Subject : found.Subject
        }
        const  token = jwt.sign(payload, "tailwebs" ,  {expiresIn: "60m"} )
        return res.status(200).send({ status: true, message: "login  successfully ", token:token})
    }catch(err)
    {
        return res.status(500).send({status : false , message : err.message})
    }
}



const get_Student = async (req,res)=> {
    try{
        let data = req.query
        let  {Subject, Name } = data
        if(Subject && Name){
        let student = await studentModel.findOne({Subject , Name})
        return res.status(200).send({status : true , message :"student data", data :student })
        }
         
        if( Name){
        let student = await studentModel.find({ Name})
        if(!student) return res.status(404).send({status : true , message :"student data not found by Name"})
        return res.status(200).send({status : true , message :"student data", data :student })
        }

        if(Subject){
        let student = await studentModel.findOne({Subject })
        if(!student) return res.status(404).send({status : true , message :"student data not found by Subject"})
        return res.status(200).send({status : true , message :"student data", data :student })
        }

    }catch(err)
    {
        return res.status(500).send({status : false , message : err.message})
    }
}


const update_student = async (req,res)=>{
    try{

        let sub = req.body.Subject
        let nam = req.body.Name
        let mar = req.body.Marks


        if(!sub && !nam && !mar) return res.status(400).send({status : false , message : "please provide some data for update"})


        let data = req.query
        let  {Subject, Name } = data
       
        if(Subject && Name){
        let student = await studentModel.findOneAndUpdate({Subject , Name}, {$set :{ Name : nam , Subject : sub, Marks : mar} }, {new : true})
        if(!student) return res.status(404).send({status : true , message :"student data not found by Name & Subject"})
        return res.status(200).send({status : true , message :"student data updated successfully", data :student })
        }
         
        if( Name){
        let student = await studentModel.findOneAndUpdate({ Name} , {$set :{ Name : nam , Subject : sub, Marks : mar} }, {new : true})
        if(!student) return res.status(404).send({status : true , message :"student data not found by Name"})
        return res.status(200).send({status : true , message :"student data updated successfully ", data :student })
        }

        if(Subject){
        let student = await studentModel.findOneAndUpdate({Subject },  {$set :{ Name : nam , Subject : sub, Marks : mar} }, {new : true})
        if(!student) return res.status(404).send({status : true , message :"student data not found by Subject"})
        return res.status(200).send({status : true , message :"student data updated successfully", data :student })
        }
    }catch(err)
    {
        return res.status(500).send({status : false , message : err.message})   
    }
}


const delete_student = async (req, res)=>{
    try{

     let data = req.query
    
    
     let find = await studentModel.updateMany(data, {Name : "", Subject : "" , Marks : 0}, {new : true})
     if(!find) return res.status(404).send({status : false, message : "not found"})

     return res.status(200).send({status : true, message : "deleted successfully" , data : find})

    }catch(err){
        return res.status(500).send({status : false, message : err.message})
    }
}
module.exports = { create_Student , login , get_Student, update_student , delete_student }