const pool = require('../../libs/database')

function create(user) {
    return pool.query('INSERT INTO users SET ?', user)
}

function getAll() {
    return pool.query('SELECT id, username FROM users')
}

function find(email, id) {
   return pool.query('SELECT id, username, password FROM users WHERE email = ? OR id = ?', [email,id])  
}

function findByID(id) {
    return pool.query('SELECT id, username, password FROM users WHERE id = ?', id) 
}

function findByEmail(email) {
    return pool.query('SELECT id, username, password FROM users WHERE email = ?', email) 
}

module.exports = {
    getAll,
    find,
    create,
    findByID,
    findByEmail
}
