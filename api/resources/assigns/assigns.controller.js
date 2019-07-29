
const assingsModel = require('./assigns.model')

function createAssing(assign) {
    return assingsModel.create(assign)
}

function getAssigns( ) {
    return assingsModel.getAllWithNames()
}

function updateAssign(assign, assign_id) {
    return assingsModel.update(assign, assign_id)
}

function findAssignById(assign_id) {
    return assingsModel.findByID(assign_id)
}

function deleteAssign(assing_id) {
    return assingsModel.deleteE(assing_id)
}

function deleteByStudentId(student_id) {
    return assingsModel.deleteByStudentId(student_id)
}
function deleteByGradeId(grade_id) {
    return assingsModel.deleteByGradeId(grade_id)
}


module.exports = {
    createAssing,
    getAssigns,
    updateAssign,
    findAssignById,
    deleteAssign,
    deleteByStudentId,
    deleteByGradeId
}
