/* eslint-disable no-undef */
const express = require('express')
const furnituresRouter = require('./v1/routes/furnitures.js')
const usersRouter = require('./v1/routes/users.js')
const { PORT } = require('./config.js')

const app = express()
app.use(express.json())

/**
 * middleware for sesion token goes here
 */

app.use('/api/v1', furnituresRouter)
app.use('/api/v1', usersRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})