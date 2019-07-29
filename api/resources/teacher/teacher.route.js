const express = require('express')
const passport = require('passport')

const log = require('./../../../utils/logger')

const errorProcess = require('./../../libs/handleError').errorsProcess
const teacherController = require('./teacher.controller')
const gradesController = require('./../grades/grades.controller')
const { validTeacher } = require('./teacher.validate')
const { TeacherNotExist } = require('./teacher.error')

const teachersRouter = express.Router()
const jwtAuthenticate = passport.authenticate('jwt',{session:false});

teachersRouter.get('/', jwtAuthenticate, errorProcess( async(req, res) => {
    const teachers = await teacherController.getTeachers()
    res.status(200).send({teachers})
}))

teachersRouter.get('/:id', jwtAuthenticate, errorProcess( async(req, res) => {
    let teacher_id =  parseInt(req.params.id);

    const teachers = await teacherController.findTeacherById(teacher_id)
    res.status(200).send({teacher:teachers[0]})
}))

teachersRouter.post('/', [jwtAuthenticate, validTeacher], errorProcess( async(req, res) => {
    const result = await teacherController.createTeacher(req.body)
    const teachers = await teacherController.findTeacherById(result.insertId)
    console.log('create student', result)
    if(!result.insertId) {
        throw new Error("No se pudo crear el maestro en la BD")
    }
    res.status(201).json(teachers[0])
}))

teachersRouter.put('/:id', [jwtAuthenticate, validTeacher], errorProcess( async (req, res) => {
    let teacher_id =  parseInt(req.params.id),
        teacher_search;
        
    teacher_search = await teacherController.findTeacherById(teacher_id);

    if (teacher_search.length == 0) {
        throw new TeacherNotExist(`El maestro con id [${teacher_id}] no existe`)
    }
    console.log('teacher upd',req.body, teacher_id)
    const update = await teacherController.updateTeacher(req.body,teacher_id)
    if(update.affectedRows == 0) {
        throw new Error("Error al actualizar el maestro")
    }
    res.status(200).send('maestro actualizado con exito')
    
}))

teachersRouter.delete('/:id', jwtAuthenticate, errorProcess( async(req,res) => {
    let teacher_id =  parseInt(req.params.id),
    teacher_search;
    
    teacher_search = await teacherController.findTeacherById(teacher_id);

    if (teacher_search.length == 0) {
        throw new TeacherNotExist(`El maestro con id [${teacher_id}] no existe`)
    }

    const resultGrades = await gradesController.deleteGradeByTeacherId(teacher_id)
    const result = await teacherController.deleteTeacher(teacher_id)
    if(result.affectedRows == 0) {
        throw new Error("Error al borrar el maestro")
    }
    res.status(200).send('maestro eliminado con exito')

}))

module.exports = teachersRouter