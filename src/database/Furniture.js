/* eslint-disable no-undef */
const DB = require('./db.json')

const getAllFunrnitures = () => {
    return DB.furnitures
}

module.exports = {
    getAllFunrnitures
}