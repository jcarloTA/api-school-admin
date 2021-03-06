const gradesModel = require('./grades.model')

function createGrade(grade) {
    return gradesModel.create(grade)
}

function getGrades( ) {
    return gradesModel.getAllWithTeacherName()
}

function updateGrade(grade, grade_id) {
    return gradesModel.update(grade, grade_id)
}

function findGradeById(grade_id) {
    return gradesModel.findByID(grade_id)
}

function deleteGrade(grade_id) {
    return gradesModel.deleteE(grade_id)
}

function deleteGradeByTeacherId(teacher_id) {
    return gradesModel.deleteByTeacherId(teacher_id)
}

module.exports = {
    createGrade,
    getGrades,
    updateGrade,
    findGradeById,
    deleteGrade,
    deleteGradeByTeacherId
}
