/* eslint-disable no-undef */
const express = require('express')
const userController = require('../../controllers/user.controller.js')

const router = express.Router()

router
    .get('/', userController.getAllUsers)
    .get('/:userId', userController.getUserById)
    .post('/', userController.createUser)
    .patch('/:userId', userController.updateUser)
    .delete('/:userId', userController.deleteUser)

module.exports = router
