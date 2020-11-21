const { User, TravelLog } = require('../db/schema')
const jwt = require('jsonwebtoken')
const { checkPassword, generatePassword } = require('../middleware/PasswordHandler')

const GetProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id)
    res.render('profile', { user })
  } catch (error) {
    throw error
  }
}

const CreateUser = async (req, res) => {
  try {
    const body = req.body
    const password = await generatePassword(body.password)
    const user = new User({
      username: body.username,
      email: body.email,
      password
    })
    user.save()
    res.render('login')
  } catch (error) {
    throw error
  }
}

const SignInUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (
      user &&
      (await checkPassword(req.body.password, user.password))
    ) {
      const payload = {
        _id: user._id,
        username: user.username,
        artistname:user.artistname,
        profilepic: user.profilepic, 
        coverpic: user.coverpic,
        links: user.links
      }
      res.locals.payload = payload
      return next()
    }
    res.status(401).send({ msg: 'Unauthorized' })
  } catch (error) {
    throw error
  }
}

const RefreshSession = (req, res) => {
  try {
    const token = res.locals.token
    res.send({ user: jwt.decode(token), token: res.locals.token })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetProfile,
  CreateUser,
  SignInUser,
  RefreshSession
}