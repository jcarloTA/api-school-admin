const userModel = require('./users.model')

function getUsers() { 
    return userModel.getAll()
}

function userCreate(user, hashedPassword) {
    return userModel.create({...user, password: hashedPassword})
}

function userExist(email, id) {
    return new Promise( async(resolve,reject) => {
        try {
            const users = await userModel.find(email, id);
            resolve(users.length > 0)
        } catch (err) {
            reject(errr)
        }
    })
}

function getUser({email:email, id:id}) {
    if(email) return userModel.findByEmail(email)
    if(id) return userModel.findByID(id)
    throw new Error("Funcion obtener usuario del controller fue llamada sin especificar email o id.")
}

module.exports = {
    userCreate,
    userExist, 
    getUsers, 
    getUser
}