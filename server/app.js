const express = require('express')
const dotenv = require('dotenv')
const route = require('./router/route')
const initializeDB = require('./db/connection')
const swisseph = require('swisseph')

swisseph.swe_set_ephe_path ('./swisseph');
// Environment Config
dotenv.config({path:'../config.env',override:true})

//Initializing DB
require('./db/connection')
initializeDB().then(()=>{}).catch(()=>{})
//Configure Express
const app = express()
app.use(express.json()).use(route)
app.listen(process.env.PORT, async ()=>{
    console.log(`Server is running at port : ${process.env.PORT}`);
})

//require('./utils/calculation')