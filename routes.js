const express = require('express')
const routes = express.Router()
const periodo = require('./calculo')

routes.get('/',function(req,res){
    return res.render("index")
})

routes.post('/calculo',periodo.post)

module.exports = routes
