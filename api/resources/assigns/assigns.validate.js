const Joi = require('joi')
const log = require('../../../utils/logger')

const bluePrintAssign = Joi.object().keys({
    section: Joi.string().max(150).required(),
    student_id: Joi.number().required(),
    grade_id: Joi.number().required()
})

const validAssign = (req, res, next) => {
    let resultado = Joi.validate(req.body, bluePrintAssign, {abortEarly:false,convert:false})
    if (resultado.error === null) {
        next()
        return
    } else  {
        let validErrors = resultado.error.details.reduce( (acumulador, error) => {
            return acumulador + `[${error.message}]`
        }, "")
        log.warn('La siguiente asignacion no paso la validacion: ', req.body, validErrors)
        res.status(400).send(`La asignacion en el body debe especificar section, student_id, grade_id. Errores en tu request: ${validErrors}`)
    }
}

module.exports = {
    validAssign
}