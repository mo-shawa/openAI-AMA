const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const { Configuration, OpenAIApi } = require('openai')
const axios = require('axios')
require('dotenv').config()

const app = express()

app.use(logger('dev'))
app.use(express.json())

app.use(favicon(path.join(__filename, '../build/favicon.ico')))
app.use(express.static(path.join(__dirname, 'build')))

app.post('/api', async (req, res) => {

    const configuration = new Configuration({ apiKey: process.env.GPT3_KEY })
    const api = new OpenAIApi(configuration)

    const model = req.body.model || "text-curie-001"

    const response = await api.createCompletion(model,
        {
            prompt: req.body.prompt,
            temperature: 0, // creativity
            max_tokens: 30, // max "syllables"
        })

    console.log(response)

    res.json({ response: response.data })
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})