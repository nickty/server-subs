// import express from 'express'
// import mongoose from 'mongoose'
// import cors from 'cors'
// import { readdirSync } from 'fs'

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { readdirSync } = require('fs')

const moran = require('morgan')
require('dotenv').config()

const app = express()

//db
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log('DB connected')
  })
  .catch((err) => console.log('DB connection error', err))

//middlewares
app.use(express.json({ limit: '5mb' }))
app.use(moran('dev'))
app.use(cors())

// routes
readdirSync('./routes').map((file) =>
  app.use('/api', require(`./routes/${file}`))
)

//listen
const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
