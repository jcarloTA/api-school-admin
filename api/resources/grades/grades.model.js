const pool = require('../../libs/database')

function create(grade) {
    return pool.query('INSERT INTO grades SET ?', grade)
}

function getAll() {
    return pool.query('SELECT id,name, teacher_id FROM grades')
}

function getAllWithTeacherName() {
    return pool.query('SELECT grades.id, grades.name, grades.teacher_id, teachers.name as teacher_name FROM grades INNER JOIN teachers ON grades.teacher_id = teachers.id')
}

function findByID(id) {
    return pool.query('SELECT id, name, teacher_id FROM grades WHERE id = ?', id) 
}

function update(grade, grade_id) {
    return pool.query('UPDATE grades SET ?  WHERE id = ?', [grade, grade_id])
}

function deleteE(grade_id) {
    return pool.query('DELETE FROM grades WHERE id = ? ', grade_id)
}

function deleteByTeacherId(teacher_id) {
    return pool.query('DELETE FROM grades WHERE teacher_id = ? ', teacher_id)
}

module.exports = {
    getAll,
    create,
    findByID,
    update,
    deleteE,
    deleteByTeacherId,
    getAllWithTeacherName
}
