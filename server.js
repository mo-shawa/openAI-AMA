const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
require('dotenv').config()

const app = express()

app.use(logger('dev'))
app.use(express.json())

app.use(favicon(path.join(__dirname, './public/favicon.ico')))
app.use(express.static(path.join(__dirname, './public')))

app.get('/test', (req, res) => {
    res.send(process.env.TEST)
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})