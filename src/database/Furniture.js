/* eslint-disable no-undef */
const DB = require('./db.json')

const getAllFurnitures = () => {
    return DB.furnitures
}

module.exports = {
    getAllFurnitures
}