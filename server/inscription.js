const express = require('express')
//const bodyParser = require('body-parser')
const joi = require('joi')

//const app = express()


function validation(req,res){

    //app.post('/', (req, res) => {

        const schema = joi.object().keys({
          login: joi.string().trim().alphanum().max(10).required(),
          password: joi.string().min(5).max(10).required(),
          nom: joi.string().required(),
          prenom: joi.string().required(),
          email: joi.string().trim().email().required(),
          tel: joi.string().required()
        })

        joi.validate(req.body, schema, (err, result) => {
          if (err) {
            console.log(err)
        
            //res.json({succes:false})
            res.json({
              succes: false,
              error: err
            }) 
      
          } else {
            console.log(req.body)
            res.json({ succes: true })
          }
      
        })
        //database 
      
     //})
} 

module.exports = {
    validation
}

