const Joi = require('joi')
const log = require('../../../utils/logger')

const blueprintTeacher = Joi.object().keys({
    name: Joi.string().max(150).required(),
    lastname: Joi.string().max(150).required(),
    gender: Joi.string().regex(/(f|m)\b/).required(),
})

const validTeacher = (req, res, next) => {
    let resultado = Joi.validate(req.body,blueprintTeacher, {abortEarly:false,convert:false})
    if (resultado.error === null) {
        next()
        return
    } else  {
        let validErrors = resultado.error.details.reduce( (acumulador, error) => {
            return acumulador + `[${error.message}]`
        }, "")
        log.warn('El siguiente maestro no paso la validacion: ', req.body, validErrors)
        res.status(400).send(`El maestro en el body debe especificar nombre, descripcion, progreso. Errores en tu request: ${validErrors}`)
    }
}

module.exports = {
    validTeacher
}