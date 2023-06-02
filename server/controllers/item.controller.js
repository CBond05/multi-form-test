const express = require('express')

const itemServices = require("../services/item.service")

const getAllItemsCtrl = async (req, res) => {
    const { status, response } = await itemServices.getAllItems()
    return res.status(status).json(response)
}

const getOneItemCtrl = async (req, res) => {
    const { id } = req.params
    const { status, response } = await itemServices.getOneItem(id)
    return res.status(status).json(response)
}

const createItemCtrl = async (req, res) => {
    const { name, is_active, username } = req.body
    const { status, response } = await itemServices.createItem(name, is_active, username)
    return res.status(status).json(response)
}

const updateItemCtrl = async (req, res) => {
    const { id } = req.params
    const { name, is_active } = req.body
    const { status, response } = await itemServices.updateItem(id, name, is_active)
    return res.status(status).json(response)
}

const deleteItemCtrl = async (req, res) => {
    const { id } = req.params
    const { status, response } = await itemServices.deleteItem(id)
    return res.status(status).json(response)
}

module.exports = {
    getAllItemsCtrl,
    getOneItemCtrl,
    createItemCtrl,
    updateItemCtrl,
    deleteItemCtrl
}
