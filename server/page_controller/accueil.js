const express = require('express')

function welcome(req,res){
    res.send("Welcome :)")
    console.log(req.sessionID)
}

module.exports = {welcome}