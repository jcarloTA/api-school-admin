const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const log = require('./../../../utils/logger')
const config = require('./../../../config')

const errorProcess = require('./../../libs/handleError').errorsProcess
const userController = require('./users.controller')
const {loginValid, userValid} = require('./users.validate')
const { DataAlreadyInUse, IncorrectCredentials } = require('./users.error')
const usersRoute = express.Router();


usersRoute.get('/', errorProcess( async (req, res) => {
    const users = await userController.getUsers();
    res.json({users:users})
}))

function transformarBodyALowerCase(req,res,next) {
    req.body.username && (req.body.username = req.body.username.toLowerCase());
    next();
}


usersRoute.post('/',[userValid, transformarBodyALowerCase], errorProcess( async(req, res) => {
    let newUser = req.body

    const userExist = await userController.userExist(newUser.email)
    if (userExist) {
        log.warn(`username [${newUser.username}] ya existe en la base de datos`)
        throw new DataAlreadyInUse()
    }

    const hashedPassword = bcrypt.hashSync(newUser.password, 10)
    const userCreated = await userController.userCreate(newUser, hashedPassword)
    if(!userCreated.insertId) {
       throw new Error("No se pudo crear el usuario en la BD")
    }
    res.status(201).send('Usuario creado exitosamente')
}))

usersRoute.post('/', [userValid, transformarBodyALowerCase], async (req, res) => {
    let newUser = req.body

    try {
        const userExist = await userController.userExist(newUser.username)
        if (userExist) {
            log.warn(`username [${newUser.username}] ya existe en la base de datos`)
            res.status(409).send('El usuario ya exite')
            return
        }
        const hashedPassword = bcrypt.hashSync(newUser.password, 10)
        const userCreated = await userController.userCreate(newUser, hashedPassword)
        if(!userCreated.insertId) {
           throw new Error("No se pudo crear el usuario en la BD")
        }
        res.status(201).send('Usuario creado exitosamente')
    } catch (err) {
        log.error(err)
        log.error(`Error ocurrio al tratar de verificar si usuario [${newUser.username}] ya existe`)
        res.status(500).send('Error ocurrio al tratar de crear nuevo usuario.')
    }
})

usersRoute.post('/login', [loginValid, transformarBodyALowerCase], errorProcess(async (req, res) => {
    let unauthenticatedUser = req.body,
        registeredUser;
        let result = await userController.getUser({
            email: unauthenticatedUser.email
        })
        registeredUser = result[0]
   

    if (!registeredUser) {
        log.info(`email [${unauthenticatedUser.email}] no existe. No pudo ser autenticado`)
        throw new IncorrectCredentials();
    }

    let correctPassword 
    correctPassword = await bcrypt.compare(unauthenticatedUser.password,registeredUser.password)
    if (correctPassword) {
        //Generar y enviar token
        let token = jwt.sign({id: registeredUser.id}, config.jwt.secret, { expiresIn: config.jwt.expiryTime })
        log.info(`Usuario ${unauthenticatedUser.username} completo autenticacion exitosamante`)
        res.status(200).json({ token })
    } else {
        log.info(`Usuario ${unauthenticatedUser.username} no completo autenticacion, contrasenia incorrecta`)
        throw new IncorrectCredentials();
    }
}))


module.exports = usersRoute;