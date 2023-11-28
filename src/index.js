/* eslint-disable no-undef */
const express = require('express')
const furnituresRouter = require('./v1/routes/furnitures.js')
const { PORT } = require('./config.js')

const app = express()
app.use(express.json())

app.use('/api/v1', furnituresRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})