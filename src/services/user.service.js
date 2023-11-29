/* eslint-disable no-undef */
const { getAllUsers } = require('../database/User.js')
const { v4: uuid } = require('uuid')

const currentDate = new Date().toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
})

const findAll = () => {
    return getAllUsers()
}

const findById = (userId) => {
    return getAllUsers().find(user => user.id === userId)
}

const createNewUser = (user) => {
    const newUser = {
        id: uuid(),
        ...user,
        createdAt: currentDate,
        updatedAt: currentDate
    }
    getAllUsers().push(newUser)
    return newUser
}

const updateUserById = (userId, body) => {
    const users = getAllUsers()
    const oldUser = users.find(user => user.id === userId)
    const updateduser = {
        id: userId,
        ...body,
        createdAt: oldUser.createdAt,
        updatedAt: currentDate
    }
    users.splice(oldUser, 1, updateduser)
    return updateduser
}


const deleteUserById = (userId) => {
    const users = getAllUsers()
    const deletedUserIndex = users.findIndex(user => user.id === userId)
    if (deletedUserIndex === -1) {
        return null
    }
    const deletedUser = users.splice(deletedUserIndex, 1)
    return deletedUser
}

module.exports = {
    findAll,
    findById,
    createNewUser,
    updateUserById,
    deleteUserById
}