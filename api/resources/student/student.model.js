const pool = require('../../libs/database')

function create(student) {
    return pool.query('INSERT INTO students SET ?', student)
}

function getAll() {
    return pool.query('SELECT id, name, lastname, gender, birthdate FROM students')
}

function findByID(id) {
    return pool.query('SELECT id, name, lastname, gender, birthdate FROM students WHERE id = ?', id) 
}

function update(student, student_id) {
    return pool.query('UPDATE students SET ?  WHERE id = ?', [student, student_id])
}

function deleteE(student_id) {
    return pool.query('DELETE FROM students WHERE id = ? ', student_id)
}

module.exports = {
    getAll,
    create,
    findByID,
    update,
    deleteE
}
