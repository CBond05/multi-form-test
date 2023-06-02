const express = require('express')
const Item = require("../models/Item")
const mongoose = require('mongoose')

const getAllItems = async () => {
    const response = await Item.find({}).sort({ createdAt: -1 })
    return { status: 200, response: response }
}

const getOneItem = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error_response = { error: 'Item not found' }
        return { status: 404, response: error_response }
    }
    const response = await Item.findById(id)
    if (!response) {
        const error_response = { error: 'Item not found' }
        return { status: 404, response: error_response }
    }

    return { status: 200, response }
}

const createItem = async (name, is_active, username) => {

    let emptyFields = []

    if (!name) {
        emptyFields.push('name')
    }
    if (!is_active) {
        emptyFields.push('is_active')
    }

    if (emptyFields.length > 0) {
        const error_response = { error: 'Please fill in all the fields', emptyFields }
        return { status: 400, response: error_response }
    }

    try {
        const response = await Item.create({ name, is_active, created_by: username, soft_delete: false })
        return { status: 200, response: response }
    } catch (error) {
        const response = { error: error.message }
        return await { status: 400, response }
    }
}

const updateItem = async (id, name, is_active) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error_response = { error: 'Item not found' }
        return { status: 404, response: error_response }
    }
    const response = await Item.findOneAndUpdate({ _id: id }, { name, is_active })

    if (!response) {
        const error_response = { error: 'Item not found' }
        return { status: 404, response: error_response }
    }

    return { status: 200, response }
}

const deleteItem = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error_response = { error: 'Item not found' }
        return { status: 404, response: error_response }
    }
    const response = await Item.findOneAndDelete({ _id: id })

    if (!response) {
        const error_response = { error: 'Item not found' }
        return { status: 404, response: error_response }
    }

    return { status: 200, response }
}

module.exports = {
    getAllItems,
    getOneItem,
    createItem,
    updateItem,
    deleteItem
}
