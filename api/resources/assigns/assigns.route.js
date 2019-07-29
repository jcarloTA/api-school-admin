const express = require('express')
const passport = require('passport')

const errorProcess = require('./../../libs/handleError').errorsProcess
const assignsController = require('./assigns.controller')
const { validAssign } = require('./assigns.validate')

const gradesController = require('./../grades/grades.controller')
const studentController = require('./../student/student.controller')
const { StudentNotExist} = require('./../student/student.error')
const { GradeNotExist } = require('./../grades/grades.error')
const { AssignsNotExist } = require('./assigns.error')
// const { GradeNotExist } = require('./grades.error')

const assignsRouter = express.Router()
const jwtAuthenticate = passport.authenticate('jwt',{session:false})

assignsRouter.get('/', jwtAuthenticate, errorProcess( async(req, res) => {
    const assigns = await assignsController.getAssigns()
    res.status(200).send({assigns})
}))

assignsRouter.get('/:id', jwtAuthenticate, errorProcess( async(req, res) => {
    const assign_id = req.params.id

    const assigns = await assignsController.findAssignById(assign_id)
    res.status(200).send({assign:assigns[0]})
}))

assignsRouter.post('/', [jwtAuthenticate, validAssign], errorProcess( async( req, res) => {
    const newAssign = req.body;
    const {student_id, grade_id} = newAssign;
    
    const searchStudent = await studentController.findStudentById(student_id);
    if(searchStudent.length == 0 ) {
        throw new StudentNotExist(`El estudiante con id ${[student_id]} no existe`)
    }
    const searchGrade = await gradesController.findGradeById(grade_id);
    if(searchGrade.length == 0) {
        throw new GradeNotExist(`El grado con id ${[grade_id]} no existe`)
    }

    const result = await assignsController.createAssing(newAssign)
    if(!result.insertId) {
        throw new Error("No se pudo asignar en la BD")
    }
    const assignCreated = await assignsController.findAssignById(result.insertId)
    res.status(201).json(assignCreated[0])
}))

assignsRouter.put('/:id', [jwtAuthenticate, validAssign], errorProcess( async (req, res) => {
    const assign_id = req.params.id
    const newAssign = req.body;
    const { grade_id, student_id} = newAssign;

    const searchAssign = await assignsController.findAssignById(assign_id)
    if (searchAssign.length == 0) {
        throw new AssignsNotExist(`La asignacion con id ${[assign_id]} no existe`)
    }

    const searchGrade = await gradesController.findGradeById(grade_id);
    if(searchGrade.length == 0) {
        throw new GradeNotExist(`El grado con id ${[grade_id]} no existe`)
    }

    const result = await assignsController.updateAssign(newAssign, assign_id)
    console.log('result ',result)
    if(result.affectedRows == 0) {
        throw new Error("No se pudo actualizar la asignacion en la BD")
    }
    const assignUpdated = await assignsController.findAssignById(assign_id)
    res.status(201).json(assignUpdated[0])
}))

assignsRouter.delete('/:id', [jwtAuthenticate], errorProcess( async (req, res) => {
    const assign_id = req.params.id

    const searchAssign = await assignsController.findAssignById(assign_id)
    if (searchAssign.length == 0) {
        throw new AssignsNotExist(`La asignacion con id ${[assign_id]} no existe`)
    }

    const result = await assignsController.deleteAssign(assign_id)
    if(result.affectedRows == 0) {
        throw new Error("Error al borrar el grado")
    }

    res.status(201).send('Asignacion borrada con exito')
}))

module.exports = assignsRouter;


