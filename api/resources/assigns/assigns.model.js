const pool = require('../../libs/database')

function create(assing) {
    return pool.query('INSERT INTO assigns   SET ?', assing)
}

function getAll() {
    return pool.query('SELECT id, student_id, grade_id, section FROM assigns')
}

function findByID(id) {
    return pool.query('SELECT id, student_id, grade_id, section FROM assigns WHERE id = ?', id) 
}

function update(assing, assing_id) {
    return pool.query('UPDATE assigns SET ?  WHERE id = ?', [assing, assing_id])
}

function deleteE(assing_id) {
    return pool.query('DELETE FROM assigns WHERE id = ? ', assing_id)
}

function deleteByStudentId(student_id) {
    return pool.query('DELETE FROM assigns WHERE student_id = ? ', student_id)
}

function deleteByGradeId(grade_id) {
    return pool.query('DELETE FROM assigns WHERE grade_id = ? ', grade_id)
}
module.exports = {
    getAll,
    create,
    findByID,
    update,
    deleteE,
    deleteByStudentId,
    deleteByGradeId
}
