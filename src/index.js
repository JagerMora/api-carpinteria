/* eslint-disable no-undef */
const express = require('express')
const furnituresRouter = require('./v1/routes/furnitures.js')

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

app.use('/api/v1', furnituresRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})