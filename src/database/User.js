/* eslint-disable no-undef */
const DB = require('./userdb.json')

const getAllUsers = () => {
    return DB.users
}

module.exports = {
    getAllUsers
}