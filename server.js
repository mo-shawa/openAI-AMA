const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const { Configuration, OpenAIApi } = require('openai')
require('dotenv').config()

const app = express()

app.use(logger('dev'))
app.use(express.json())

app.use(favicon(path.join(__filename, '../build/favicon.ico')))
app.use(express.static(path.join(__dirname, 'build')))

app.post('/api', async (req, res) => {
    console.log("here's req.body: ", req.body)

    const configuration = new Configuration({ apiKey: process.env.GPT3_KEY })
    const api = new OpenAIApi(configuration)

    const model = req.body.model || "text-curie-001"
    const temp = parseInt(req.body.temperature) || 0.5
    const tokens = parseInt(req.body.max_tokens) || 50
    console.log(parseInt(req.body.temperature), req.body.max_tokens)
    const response = await api.createCompletion(model,
        {
            prompt: req.body.prompt,
            temperature: temp, // creativity
            max_tokens: tokens, // max "syllables"
        })

    res.json({ response: response.data })
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})