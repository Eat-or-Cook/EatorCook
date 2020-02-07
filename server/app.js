const express = require('express')
const app = express()
const port = 3001
const router = require('./router')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))

app.use('/', router)
app.use(errorHandler)
app.listen(port, ()=> {
    console.log(`server is running on port ${port}`)
})