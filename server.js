#!/usr/bin/env node

var express = require('express')
var app = express()
var path = require('path')

app.use(express.static(__dirname))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'/ejs'))

var VALIDATOR_REGISTRY_API = process.env.VALIDATOR_REGISTRY_API || 'https://api.validators.ripple.com'

app.get('/scripts/services/validators_loader.js', function(req, res) {
  res.render('scripts/services/validators_loader.ejs', {
    VALIDATOR_REGISTRY_API: VALIDATOR_REGISTRY_API
  })
})

app.listen(process.env.PORT || 1337)

