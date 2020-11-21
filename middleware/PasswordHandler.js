const bcrypt = require('bcrypt')
const saltRounds = 12

const generatePassword = async (pwd) => {
  const password = await bcrypt.hash(pwd, saltRounds)
  return password
}
const checkPassword = async (sentPassword, storedPassword) => {
  const passwordValid = await bcrypt.compare(sentPassword, storedPassword)
  return passwordValid
}
module.exports = {
  generatePassword,
  checkPassword
}