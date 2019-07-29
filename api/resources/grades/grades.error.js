

class GradeNotExist extends Error {
    constructor(message) {
        super(message)
        this.message = message || 'El Grado no existe.'
        this.status = 404
        this.name = "GradeNotExist"
    }
}

module.exports = {
    GradeNotExist
}