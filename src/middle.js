const jwt = require('jsonwebtoken')
const studentModel = require('./studentModel')

const authentication = async (req,res,next)=>{
try{
    let Token = req.headers["authorization"]
    if (!Token){
        return res.status(400).send({ status: false, message: "token is not present" })
    }
    
    Token = Token.slice(7)
    

    jwt.verify(Token,"tailwebs", function (err, decoded){
        if(err){
            return res.status(401).send({status:false, message:`invalid token`})
        }else{
            req.Tok = decoded
            next()
        }
    })

}catch(err)
{
    return res.status(500).send({status : false , message : err.message})
}
}

const authorization = async (req, res, next)=>{
    try{
        
            let token = req.Tok
            let data = req.query
            if(Object.keys(data).length == 0) return res.status(200).send({status : true , message :" please proved filter data",})

            let  {Subject, Name } = data
         
          
            if(Name && Subject){
            if(Subject.trim().length == 0 && Name.trim().length == 0) return res.status(400).send({status : false, message : "please provide filter data"})
            if(Subject.length == 0 && Name.length == 0)  return res.status(400).send({status : false, message : "please provide filter data"})
            }

            if(Subject && Name == undefined)
            if(Subject.trim().length == 0) return res.status(400).send({status : false, message : "please provide filter data"})
            if(Name && Subject == undefined)
            if(Name.trim().length == 0) return res.status(400).send({status : false, message : "please provide filter data"})
            

            
            if(Name){
                let student = await studentModel.findOne({ Name})
                if(!student) return res.status(404).send({status : true , message :"student data not found by Name"})
                if(token.Name != student.Name)  return res.status(403).send({status : false , message : "you are not authorize student"})
                next()
            }
            
            if(Subject){
                let student = await studentModel.findOne({Subject })
                if(!student) return res.status(404).send({status : true , message :"student data not found by Subject"})
                if(token.Subject != student.Subject)  return res.status(403).send({status : false , message : "you are not authorize student"})
                next()
            }

            if(Subject && Name){
            let student = await studentModel.findOne({Subject , Name})
            if(!student) return res.status(404).send({status : true , message :"student data not found by Name & subject"})
            if(token.Subject !=  student.Subject || token.Name != student.Name) return res.status(403).send({status : false , message : "you are not authorize student"})
            next()
            }

            
    }catch(err){
        return res.status(500).send({status : false, message : err.message})
    }
}

module.exports = {authentication , authorization}