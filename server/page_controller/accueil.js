const express = require('express')

function welcome(req,res){
    res.send("Welcome :)")
}

module.exports = {welcome}