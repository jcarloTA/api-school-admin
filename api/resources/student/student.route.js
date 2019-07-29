const express = require('express')
const passport = require('passport')

const log = require('./../../../utils/logger')

const errorProcess = require('./../../libs/handleError').errorsProcess
const studentsController = require('./student.controller')
const assignsController = require('./../assigns/assigns.controller')
const { validStudent } = require('./student.validate')
const { StudentNotExist } = require('./student.error')

const studentsRouter = express.Router()
const jwtAuthenticate = passport.authenticate('jwt',{session:false});

jwtAuthenticate
studentsRouter.get('/', jwtAuthenticate, errorProcess(async (req, res) => {
    const students = await studentsController.getStudents()
    res.status(200).send({students})
}))

studentsRouter.get('/:id', jwtAuthenticate, errorProcess(async (req, res) => {
    let student_id =  parseInt(req.params.id);
    const students = await studentsController.findStudentById(student_id)
    res.status(200).send({student: students[0]})
}))

studentsRouter.post('/', [ validStudent , jwtAuthenticate], errorProcess( async (req, res) => {
    const result = await studentsController.createStudent(req.body)
    const students = await studentsController.findStudentById(result.insertId)
    console.log('create student', result)
    if(!result.insertId) {
        throw new Error("No se pudo crear el estudiante en la BD")
    }
    res.status(201).json(students[0])
}))

studentsRouter.put('/:id', [jwtAuthenticate, validStudent], errorProcess( async (req, res) => {
    let student_id =  parseInt(req.params.id),
        student_seartch;
        
    student_seartch = await studentsController.findStudentById(student_id);

    if (student_seartch.length == 0) {
        throw new StudentNotExist(`El studiante con id [${student_id}] no existe`)
    }

    const update = await studentsController.updateStudent(req.body,student_id)
    if(update.affectedRows == 0) {
        throw new Error("Error al actualizar el estudiante")
    }
    res.status(200).send('estudiante actualizado con exito')
    
}))

studentsRouter.delete('/:id', [jwtAuthenticate], errorProcess( async (req, res) => {
    let student_id =  parseInt(req.params.id),
    student_seartch;
    
    student_seartch = await studentsController.findStudentById(student_id);

    if (student_seartch.length == 0) {
        throw new StudentNotExist(`El estudiante con id [${student_id}] no existe`)
    }
    const resultDelAssign = await assignsController.deleteByStudentId(student_id)
    const result = await studentsController.deleteStudent(student_id)
    if(result.affectedRows == 0) {
        throw new Error("Error al borrar el estudiante")
    }
    res.status(200).send('estudiante eliminado con exito')

}))

module.exports = studentsRouter
