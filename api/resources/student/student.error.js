

class StudentNotExist extends Error {
    constructor(message) {
        super(message)
        this.message = message || 'El estudiante no existe.'
        this.status = 404
        this.name = "EstudentNotExist"
    }
}

module.exports = {
    StudentNotExist
}