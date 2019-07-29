const pool = require('../../libs/database')

function create(grade) {
    return pool.query('INSERT INTO grades SET ?', grade)
}

function getAll() {
    return pool.query('SELECT id,name, teacher_id FROM grades')
}

function findByID(id) {
    return pool.query('SELECT id, name, teacher_id FROM grades WHERE id = ?', id) 
}

function update(grade, grade_id) {
    return pool.query('UPDATE grades SET ?  WHERE id = ?', [grade, grade_id])
}

function deleteE(student_id) {
    return pool.query('DELETE FROM grades WHERE id = ? ', student_id)
}

module.exports = {
    getAll,
    create,
    findByID,
    update,
    deleteE
}
