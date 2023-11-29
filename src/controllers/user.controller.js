/* eslint-disable no-undef */
const { findAll, findById, createNewUser, updateUserById, deleteUserById } = require('../services/user.service.js')
const HTTP_CODES = require('../utils/httpStatusCodes.js')

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await findAll()
        res.status(HTTP_CODES.OK).send({ status: 'OK', data: allUsers })
    } catch (error) {
        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ status: 'Error', message: error.message })
    }
}

const getUserById = async (req, res) => {
    const { userId } = req.params
    try {
        const user = await findById(userId)
        if (!user) {
            return res.status(HTTP_CODES.NOT_FOUND).send({ status: 'Error', message: 'User not found' })
        }
        res.status(HTTP_CODES.OK).send({ status: 'OK', data: user })
    } catch (error) {
        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ status: 'Error', message: error.message })
    }
}

const createUser = (req, res) => {
    const { body } = req
    if (
        !body.name ||
        !body.lastname ||
        !body.email
    ) {
        return res.status(HTTP_CODES.BAD_REQUEST).send({ status: 'Error', message: 'Missing required fields' })
    }

    const newUser = {
        name: body.name,
        lastname: body.lastname,
        email: body.email,
    }

    try {
        const user = createNewUser(newUser)
        res.status(HTTP_CODES.CREATED).send({ status: 'OK', data: user })
    } catch (error) {
        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ status: 'Error', message: 'Error creating user' })
    }
}

const updateUser = async (req, res) => {
    const { userId } = req.params
    const { body } = req

    if (!userId) {
        return res.status(HTTP_CODES.BAD_REQUEST).send({ status: 'Error', message: 'Missing id' })
    }

    try {
        const user = await findById(userId)
        if (!user) {
            return res.status(HTTP_CODES.NOT_FOUND).send({ status: 'Error', message: 'User not found' })
        }
        const updatedUser = await updateUserById(userId, body)
        res.status(HTTP_CODES.OK).send({ status: 'OK', data: updatedUser })
    } catch (error) {
        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ status: 'Error', message: 'Internal server error' })
    }
}

const deleteUser = (req, res) => {
    const { userId } = req.params

    if (!userId) {
        return res.status(HTTP_CODES.BAD_REQUEST).send({ status: 'Error', message: 'Missing id' })
    }

    try {
        const user = deleteUserById(userId)
        if (!user) {
            return res.status(HTTP_CODES.NOT_FOUND).send({ status: 'Error', message: 'User not found' })
        }
        res.status(HTTP_CODES.OK).send({ status: 'OK', data: user })
    } catch (error) {
        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ status: 'Error', message: 'Error deleting user' })
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}