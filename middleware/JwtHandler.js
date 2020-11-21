require('dotenv').config()
const jwt = require('jsonwebtoken')
const secretKey = process.env.SESSION_SECRET

const getToken = (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1]
  res.locals.token = token
  next()
}
const verifyToken = (req, res, next) => {
  let token = res.locals.token
  jwt.verify(token, secretKey, (err, t) => {
    if (err) {
      return res.status(401).json({ msg: 'Invalid Token' })
    }
    return req.query.active ? next() : res.send(t)
  })
}
const createToken = (req, res) => {
  const token = jwt.sign(res.locals.payload, secretKey)
  res.send({ user: res.locals.payload, token })
}
module.exports = {
  createToken,
  verifyToken,
  getToken
}