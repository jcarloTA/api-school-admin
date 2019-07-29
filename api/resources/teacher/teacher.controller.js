const teacherModel = require('./teacher.model')

function createTeacher(teacher) {
    return teacherModel.create(teacher)
}

function getTeachers( ) {
    return teacherModel.getAll()
}

function updateTeacher(teacher, teacher_id) {
    return teacherModel.update(teacher, teacher_id)
}

function findTeacherById(teacher_id) {
    return teacherModel.findByID(teacher_id)
}

function deleteTeacher(teacher_id) {
    return teacherModel.deleteE(teacher_id)
}

module.exports = {
    createTeacher,
    getTeachers,
    updateTeacher,
    findTeacherById,
    deleteTeacher
}
