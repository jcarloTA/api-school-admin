const gradesModel = require('./grades.model')

function createGrade(grade) {
    return gradesModel.create(grade)
}

function getGrades( ) {
    return gradesModel.getAll()
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

module.exports = {
    createGrade,
    getGrades,
    updateGrade,
    findGradeById,
    deleteGrade
}
