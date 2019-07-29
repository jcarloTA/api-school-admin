

class AssignsNotExist extends Error {
    constructor(message) {
        super(message)
        this.message = message || 'La asignacion no existe.'
        this.status = 404
        this.name = "AssignsNotExist"
    }
}

module.exports = {
    AssignsNotExist
}