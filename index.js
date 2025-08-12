// import dotenv to load env variables
require('dotenv').config()
// import express
const express = require('express')
const cors = require('cors')
const routes = require('./routes')
// crete server
const bookstoreServer = express()

bookstoreServer.use(cors())

bookstoreServer.use(express.json())

bookstoreServer.use(routes)

bookstoreServer.use('/imageUploads',express.static("./imgUploads"))
bookstoreServer.use('/pdfUploads',express.static("./pdfUploads"))

// import connection
require('./connection')

const PORT = 7000 || process.env.PORT

// listen to the port

bookstoreServer.listen(PORT,()=>{
    console.log(`listening to the port ${PORT}`);
    
})