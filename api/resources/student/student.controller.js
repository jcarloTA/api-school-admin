
const studentModel = require('./student.model')

function createStudent(student) {
    return studentModel.create(student)
}

function getStudents( ) {
    return studentModel.getAll()
}

function getStudentById(student_id) {
    return studentModel.getById(student_id)
}

function updateStudent(student, student_id) {
    return studentModel.update(student, student_id)
}

function findStudentById(student_id) {
    return studentModel.findByID(student_id)
}

function deleteStudent(student_id) {
    return studentModel.deleteE(student_id)
}
module.exports = {
    createStudent,
    getStudents,
    updateStudent,
    findStudentById,
    deleteStudent,
    getStudentById
}
