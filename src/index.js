require('dotenv/config')

const path = require('path')

const express = require('express')
const cors = require('cors')

const router = require('./routes')

const app = express()

app.use(cors())

app.use('/uploads',express.static(path.resolve(__dirname, 'uploads')))
app.use('/web/public',express.static(path.resolve(__dirname, 'frontend','public')))

app.use(express.json())

app.use(router)

/**
 * Frontend
 */

const frontendRouter = require('./frontend/routes')

app.set('views',path.resolve(__dirname, 'frontend','views'))
app.set('view engine', 'ejs')

app.use('/web',frontendRouter)

/**
 * end frontend
 */

app.listen(process.env.PORT | 3333, () => {
    console.log(
        `Api running on: ${ process.env.URL }...`
    )
})