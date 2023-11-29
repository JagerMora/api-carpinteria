/* eslint-disable no-undef */
const { getAllFurnitures } = require('../database/Furniture.js')
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
    return getAllFurnitures()
}

const findById = (furnitureId) => {
    return getAllFurnitures().find(furniture => furniture.id === furnitureId)
}

const createNewUser = (furniture) => {
    const newFurniture = {
        id: uuid(),
        ...furniture,
        createdAt: currentDate,
        updatedAt: currentDate
    }
    getAllFurnitures().push(newFurniture)
    return newFurniture
}

const updateUserById = (furnitureId, body) => {
    const furnitures = getAllFurnitures()
    const oldFurniture = furnitures.find(furniture => furniture.id === furnitureId)
    const updatedfurniture = {
        id: furnitureId,
        ...body,
        createdAt: oldFurniture.createdAt,
        updatedAt: currentDate
    }
    furnitures.splice(oldFurniture, 1, updatedfurniture)
    return updatedfurniture
}


const deleteUserById = (furnitureId) => {
    const furnitures = getAllFurnitures()
    const deletedFurnitureIndex = furnitures.findIndex(furniture => furniture.id === furnitureId)
    if (deletedFurnitureIndex === -1) {
        return null
    }
    const deletedFurniture = furnitures.splice(deletedFurnitureIndex, 1)
    return deletedFurniture
}

module.exports = {
    findAll,
    findById,
    createNewUser,
    updateUserById,
    deleteUserById
}