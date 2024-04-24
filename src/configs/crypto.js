const crypto = require('crypto') 

function generateSalt() {
    return crypto.randomBytes(16).toString('hex')
}

function hashPassword(senha, salt) {
    return crypto.pbkdf2Sync(senha, salt, 1000, 64, 'sha512').toString('hex')
}

const senha = 'senha' 
const salt = generateSalt()

const hashPassword = hashPassword(senha, salt)

console.log(salt)
console.log(hashPassword)