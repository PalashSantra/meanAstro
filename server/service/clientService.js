const Validator = require('validatorjs')
const Client = require('../model/clientModel')

const validationRule = {
    name: 'required|string|min:2',
    email: 'email',
    phone: 'required',
    date: 'required|date',
    latitude: 'required|string',
    longitude: 'required|string'
}
const saveData = async (req, res) => {
    try {
        const validation = await new Validator(req.body, validationRule)
        if (validation.fails()) {
            console.log(validation.errors)
            return res.status(422).json({
                status: 'error',
                message: 'Fill the inputs properly',
                result: validation.errors
            })
        }
        const inputData = req.body
        inputData.date = Date.parse(inputData.date)
        inputData.latitude = Number(inputData.latitude).toString()
        inputData.longitude = Number(inputData.longitude).toString()
        if ((inputData.latitude === NaN || inputData.latitude === 0)
            || (inputData.longitude === NaN || inputData.longitude === 0)) {
            return res.status(422).json({
                status: 'error',
                message: 'Latitude or longitude is not in format'
            })
        }
        phoneExist = await Client.findOne({ phone: inputData.phone })
        if (phoneExist) {
            return res.status(422).json({
                status: 'error',
                message: 'Client exist with same phone number'
            })
        }
        client = new Client(inputData)
        await client.save()
        return res.status(200).json({
            status: 'success',
            message: 'client added successfully'
        })
    } catch (e) {
        console.log('Client add failed', e)
        return res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        })
    }
}

const updateData = async (req, res) => {
    try {
        const validation = await new Validator(req.body, validationRule)
        if (validation.fails()) {
            console.log(validation.errors)
            return res.status(422).json({
                status: 'error',
                message: 'Fill the inputs properly',
                result: validation.errors
            })
        }
        const inputData = req.body
        inputData.date = Date.parse(inputData.date)
        inputData.latitude = Number(inputData.latitude).toString()
        inputData.longitude = Number(inputData.longitude).toString()
        if ((inputData.latitude === NaN || inputData.latitude === 0)
            || (inputData.longitude === NaN || inputData.longitude === 0)) {
            return res.status(422).json({
                status: 'error',
                message: 'Latitude or longitude is not in format'
            })
        }

        const clientId = req.params.clientId
        if (clientId) {
            client = await Client.findById(clientId)
            if (client) {
                phoneExist = await Client.findOne({ phone: inputData.phone })
                if (phoneExist && (!phoneExist._id.equals(client._id))) {
                    return res.status(422).json({
                        status: 'error',
                        message: 'Client exist with same phone number'
                    })
                }
                await client.updateOne(inputData)
                res.status(200).json({
                    status: 'success',
                    message: 'client successfully updated'
                })
            } else {
                res.status(402).json({
                    status: 'error',
                    message: 'client not found'
                })
            }

        }
        else {
            res.status(402).json({
                status: 'error',
                message: 'Bad Request'
            })
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        })
    }
}

const deleteData = async (req, res) => {
    try {
        const clientId = req.params.clientId
        if (clientId) {
            client = await Client.findById(clientId)
            if (client) {
                await client.remove()
                res.status(200).json({
                    status: 'success',
                    message: 'client successfully deleted',
                    result: client
                })
            } else {
                res.status(402).json({
                    status: 'error',
                    message: 'client not found'
                })
            }
        }
        else {
            res.status(402).json({
                status: 'error',
                message: 'Bad Request'
            })
        }
    } catch (e) {
        console.log(e)
        res.status(200).json({
            status: 'error',
            message: 'Something went wrong'
        })
    }
}

const getData = async function (req, res) {
    try {
        const clientId = req.params.clientId
        if (clientId) {
            client = await Client.findById(clientId)
            if (client) {
                res.status(200).json({
                    status: 'success',
                    message: 'client successfully fetched',
                    result: client
                })
            } else {
                res.status(402).json({
                    status: 'error',
                    message: 'client not found'
                })
            }
        }
        else {
            res.status(402).json({
                status: 'error',
                message: 'Bad Request'
            })
        }
    } catch (e) {
        console.log(e)
        res.status(200).json({
            status: 'error',
            message: 'Something went wrong'
        })
    }
}

const listData = async (req, res) => {
    try {
        const list = await Client.find()
        return res.status(200).json({
            status: 'success',
            message: 'all client data fetched',
            result: list
        })
    } catch (e) {
        console.log('Client listing failed', e)
        return res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        })
    }


}

module.exports = {
    saveData,
    updateData,
    deleteData,
    getData,
    listData
}

