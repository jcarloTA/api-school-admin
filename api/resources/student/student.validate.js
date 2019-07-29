const Joi = require('joi')
const log = require('../../../utils/logger')

const blueprintStudent = Joi.object().keys({
    name: Joi.string().max(150).required(),
    lastname: Joi.string().max(150).required(),
    gender: Joi.string().regex(/(f|m)\b/).required(),
    birthdate: Joi.string().min(6).regex(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/).required()
})

const validStudent = (req, res, next) => {
    let resultado = Joi.validate(req.body,blueprintStudent, {abortEarly:false,convert:false})
    if (resultado.error === null) {
        next()
        return
    } else  {
        let validErrors = resultado.error.details.reduce( (acumulador, error) => {
            return acumulador + `[${error.message}]`
        }, "")
        log.warn('El siguiente estudiante no paso la validacion: ', req.body, validErrors)
        res.status(400).send(`El estudiante en el body debe especificar nombre, lastname, gender y birthdate. Errores en tu request: ${validErrors}`)
    }
}

module.exports = {
    validStudent
}