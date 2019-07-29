const pool = require('../../libs/database')

function create(assing) {
    return pool.query('INSERT INTO assigns   SET ?', assing)
}

function getAll() {
    return pool.query('SELECT id, student_id, grade_id, section FROM assigns')
}

function getAllWithNames() {
    return pool.query('SELECT assigns.id, assigns.section, assigns.student_id, assigns.grade_id, grades.name AS grade_name, students.name AS student_name FROM assigns INNER JOIN grades ON grades.id = assigns.grade_id INNER JOIN students ON students.id = assigns.student_id')
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
    deleteByGradeId,
    getAllWithNames

}
