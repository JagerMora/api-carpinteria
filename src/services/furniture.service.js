/* eslint-disable no-undef */
const { getAllFunrnitures } = require('../database/Furniture.js')
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
    const allFurnitures = getAllFunrnitures()
    return allFurnitures
}

const findById = (furnitureId) => {
    const furniture = getAllFunrnitures().find(furniture => furniture.id === furnitureId)
    return furniture
}

const createNewFurniture = (furniture) => {
    const newFurniture = {
        id: uuid(),
        ...furniture,
        createdAt: currentDate,
        updatedAt: currentDate
    }
    getAllFunrnitures().push(newFurniture)
    return newFurniture
}

const updateFurnitureById = (furnitureId, body) => {
    const furnitures = getAllFunrnitures()
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


const deleteFurnitureById = (furnitureId) => {
    const furnitures = getAllFunrnitures()
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
    createNewFurniture,
    updateFurnitureById,
    deleteFurnitureById
}