const Joi = require('joi')
const log = require('../../../utils/logger')

const blueprintGrades = Joi.object().keys({
    name: Joi.string().max(150).required(),
    teacher_id: Joi.number().required(),
})

const validGrade = (req, res, next) => {
    let resultado = Joi.validate(req.body, blueprintGrades, {abortEarly:false,convert:false})
    if (resultado.error === null) {
        next()
        return
    } else  {
        let validErrors = resultado.error.details.reduce( (acumulador, error) => {
            return acumulador + `[${error.message}]`
        }, "")
        log.warn('El siguiente grado no paso la validacion: ', req.body, validErrors)
        res.status(400).send(`El grado en el body debe especificar nombre, descripcion, progreso. Errores en tu request: ${validErrors}`)
    }
}

module.exports = {
    validGrade
}