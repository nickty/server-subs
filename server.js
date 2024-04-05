import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { readdirSync } from 'fs'

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

// routes

//listen
