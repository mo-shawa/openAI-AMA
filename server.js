const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const axios = require('axios')
require('dotenv').config()

const app = express()

app.use(logger('dev'))
app.use(express.json())

app.use(favicon(path.join(__filename, '../build/favicon.ico')))
app.use(express.static(path.join(__dirname, 'build')))



app.post('/api', async (req, res) => {

    res.json({ body: req.body })
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})