require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const itemsRoutes = require('./routes/private/items.route')
const userRoutes = require('./routes/public/auth.route')

const app = express()

app.use(express.json())


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('db connected & listeneing on port 4000')
        })
    })
    .catch((error) => {
        console.log(error)
    })

app.use('/api/items', itemsRoutes)
app.use('/api/user', userRoutes)
