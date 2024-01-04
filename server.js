const express = require('express')
const app = express()
const userRout = require('./routes/userRoutes')
const technoRout = require('./routes/technoRoutes.js')
const msgRout = require('./routes/msgRoutes.js')
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.use(express.json());       
app.use(express.urlencoded({extended: true})); 

app.use('/user',userRout)
app.use('/techno',technoRout)
app.use('/com',msgRout)

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/index.html");
});

app.listen(8000,()=>{console.log("Serveur à l'écoute")}) 