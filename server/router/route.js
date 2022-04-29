const express = require('express')
const userService = require('../service/userService')
const clientService = require('../service/clientService')
const authenticate = require('../service/authService')

const router = express.Router()

router.get('/health', (req,res)=>{
    try{
        res.send('Server is up')
    }
    catch(e){
        console.log('Health not OK',e)
    }
})
router.post('/register', userService.register)
router.post('/login', userService.login)
router.post('/logout', userService.logout)

router.post('/client/save', authenticate ,clientService.saveData)
router.post('/client/delete/:clientId', authenticate ,clientService.deleteData)
router.post('/client/update/:clientId', authenticate ,clientService.updateData)
router.get('/client/:clientId', authenticate ,clientService.getData)
router.get('/client', authenticate ,clientService.listData)


module.exports = router


