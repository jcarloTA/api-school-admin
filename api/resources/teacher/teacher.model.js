const pool = require('../../libs/database')

function create(student) {
    return pool.query('INSERT INTO teachers SET ?', student)
}

function getAll() {
    return pool.query('SELECT id, name, lastname, gender FROM teachers')
}

function findByID(id) {
    return pool.query('SELECT id, name, lastname, gender FROM teachers WHERE id = ?', id) 
}

function update(teacher, treacher_id) {
    return pool.query('UPDATE teachers SET ?  WHERE id = ?', [teacher, treacher_id])
}

function deleteE(teacher_id) {
    return pool.query('DELETE FROM teachers WHERE id = ? ', teacher_id)
}

module.exports = {
    getAll,
    create,
    findByID,
    update,
    deleteE
}
