const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const posteRoute = require('./routes/utils')
const userRoute = require('./routes/auth')
const adminRoute = require('./routes/auth_admin')
const testRoute = require('./routes/tests')
const candRoute = require('./routes/cand')

app.use(bodyParser.json())

app.use('/utils', posteRoute)
app.use('/auth', userRoute)
app.use('/auth-admin', adminRoute)
app.use('/test', testRoute)
app.use('/cand', candRoute)

module.exports = app
