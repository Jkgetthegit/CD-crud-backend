const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const router = require('./route/routes')
const PORT = 5000 || process.env.PORT


app.use(bodyParser.json())
app.use('/api',router)


app.listen(PORT , () =>{
     console.log(`Server is running on ${PORT}`)
})