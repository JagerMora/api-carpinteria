/* eslint-disable no-undef */
const express = require('express')
const furnitureController = require('../../controllers/furniture.controller.js')

const router = express.Router()

router
    .get('/', furnitureController.getAllFunrnitures)
    .get('/:furnitureId', furnitureController.getFurnitureById)
    .post('/', furnitureController.createFurniture)
    .patch('/:furnitureId', furnitureController.updateFurniture)
    .delete('/:furnitureId', furnitureController.deleteFurniture)

module.exports = router
