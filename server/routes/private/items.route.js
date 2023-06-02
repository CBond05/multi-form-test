const express = require('express')

const itemControllers = require("../../controllers/item.controller")
const authHandler = require('../../middlewares/authHandler')

const itemsRouter = express.Router()

itemsRouter.use(authHandler)

itemsRouter.get('/', itemControllers.getAllItemsCtrl)

itemsRouter.get('/:id', itemControllers.getOneItemCtrl)

itemsRouter.post('/', itemControllers.createItemCtrl)

itemsRouter.patch('/:id', itemControllers.updateItemCtrl)

itemsRouter.delete('/:id', itemControllers.deleteItemCtrl)

module.exports = itemsRouter
