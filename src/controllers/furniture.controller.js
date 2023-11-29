/* eslint-disable no-undef */
const { findAll, findById, createNewFurniture, updateFurnitureById, deleteFurnitureById } = require('../services/furniture.service.js')
const HTTP_CODES = require('../utils/httpStatusCodes.js')

const getAllFurnitures = async (req, res) => {
    try {
        const allFurnitures = await findAll()
        res.status(HTTP_CODES.OK).send({ status: 'OK', data: allFurnitures })
    } catch (error) {
        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ status: 'Error', message: error.message })
    }
}

const getFurnitureById = async (req, res) => {
    const { furnitureId } = req.params
    try {
        const furniture = await findById(furnitureId)
        if (!furniture) {
            return res.status(HTTP_CODES.NOT_FOUND).send({ status: 'Error', message: 'Furniture not found' })
        }
        res.status(HTTP_CODES.OK).send({ status: 'OK', data: furniture })
    } catch (error) {
        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ status: 'Error', message: error.message })
    }
}

const createFurniture = (req, res) => {
    const { body } = req
    if (
        !body.name ||
        !body.madera ||
        !body.price ||
        !body.stock ||
        !body.description
    ) {
        return res.status(HTTP_CODES.BAD_REQUEST).send({ status: 'Error', message: 'Missing required fields' })
    }

    const newFurniture = {
        name: body.name,
        madera: body.madera,
        price: body.price,
        stock: body.stock,
        description: body.description
    }

    try {
        const furniture = createNewFurniture(newFurniture)
        res.status(HTTP_CODES.CREATED).send({ status: 'OK', data: furniture })
    } catch (error) {
        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ status: 'Error', message: 'Error creating furniture' })
    }
}

const updateFurniture = async (req, res) => {
    const { furnitureId } = req.params
    const { body } = req

    if (!furnitureId) {
        return res.status(HTTP_CODES.BAD_REQUEST).send({ status: 'Error', message: 'Missing id' })
    }

    try {
        const furniture = await findById(furnitureId)
        if (!furniture) {
            return res.status(HTTP_CODES.NOT_FOUND).send({ status: 'Error', message: 'Furniture not found' })
        }
        const updatedfurniture = await updateFurnitureById(furnitureId, body)
        res.status(HTTP_CODES.OK).send({ status: 'OK', data: updatedfurniture })
    } catch (error) {
        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ status: 'Error', message: 'Internal server error' })
    }
}

const deleteFurniture = (req, res) => {
    const { furnitureId } = req.params

    if (!furnitureId) {
        return res.status(HTTP_CODES.BAD_REQUEST).send({ status: 'Error', message: 'Missing id' })
    }

    try {
        const furniture = deleteFurnitureById(furnitureId)
        if (!furniture) {
            return res.status(HTTP_CODES.NOT_FOUND).send({ status: 'Error', message: 'Furniture not found' })
        }
        res.status(HTTP_CODES.OK).send({ status: 'OK', data: furniture })
    } catch (error) {
        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ status: 'Error', message: 'Error deleting furniture' })
    }
}

module.exports = {
    getAllFurnitures,
    getFurnitureById,
    createFurniture,
    updateFurniture,
    deleteFurniture
}