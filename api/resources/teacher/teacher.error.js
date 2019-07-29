

class TeacherNotExist extends Error {
    constructor(message) {
        super(message)
        this.message = message || 'El maestro no existe.'
        this.status = 404
        this.name = "TeacherNotExist"
    }
}

module.exports = {
    TeacherNotExist
}