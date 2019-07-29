const express = require('express')
const passport = require('passport')

const log = require('./../../../utils/logger')

const errorProcess = require('./../../libs/handleError').errorsProcess
const gradesController = require('./grades.controller')
const assignsController = require('./../assigns/assigns.controller')
const teacherController = require('./../teacher/teacher.controller')
const { TeacherNotExist } = require('./../teacher/teacher.error')

const { validGrade } = require('./grades.validate')
const { GradeNotExist } = require('./grades.error')

const gradesRouter = express.Router()
const jwtAuthenticate = passport.authenticate('jwt',{session:false});

gradesRouter.get('/', jwtAuthenticate, errorProcess( async(req, res) => {
    const grades = await gradesController.getGrades();
    res.status(200).send({grades})
}))

gradesRouter.post('/', [jwtAuthenticate, validGrade], errorProcess( async(req, res) => {
    const { teacher_id } = req.body
    const teacherSearch = await teacherController.findTeacherById(teacher_id)
    if(teacherSearch.length == 0) {
        throw new TeacherNotExist(`Teacher con id ${[teacher_id]} no existe`)
    }
    console.log('teacher seach', teacherSearch)

    const result = await gradesController.createGrade(req.body)
    const grades = await gradesController.findGradeById(result.insertId)
    console.log('create grade', result)
    if(!result.insertId) {
        throw new Error("No se pudo crear el grado en la BD")
    }
    res.status(201).json(grades[0])
}))

gradesRouter.put('/:id', [jwtAuthenticate, validGrade], errorProcess( async(req, res) => {
    const grade_id  = req.params.id
    const { teacher_id } = req.body
    const teacherSearch = await teacherController.findTeacherById(teacher_id)
    const gradeSearch = await gradesController.findGradeById(grade_id)

    if(gradeSearch.length == 0) {
        throw new GradeNotExist(`El grado con id ${[grade_id]} no existe`)
    } 
    if(teacherSearch.length == 0) {
        throw new TeacherNotExist(`Teacher con id ${[teacher_id]} no existe`)
    }

    const result = await gradesController.updateGrade(req.body, grade_id)
    const grades = await gradesController.findGradeById(grade_id)
    console.log('result', result)
    if(result.affectedRows == 0) {
        throw new Error("Error al actualizar grado")
    }
    res.status(201).json(grades[0])
}))

gradesRouter.delete('/:id', jwtAuthenticate, errorProcess( async(req, res) => {
    const grade_id  = req.params.id

    const gradeSearch = await gradesController.findGradeById(grade_id)
    if(gradeSearch.length == 0) {
        throw new GradeNotExist(`El grado con id ${[grade_id]} no existe`)
    } 
    const deleAssign = await assignsController.deleteByGradeId(grade_id)
    const result = await gradesController.deleteGrade(grade_id)
    if(result.affectedRows == 0) {
        throw new Error("Error al borrar el grado")
    }

    res.status(201).send('Grado borrado con exito')
}))

module.exports = gradesRouter