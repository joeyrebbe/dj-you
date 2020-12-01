const { User } = require('../db/schema')
const passport = require('../middleware/passportConfig')
const { generatePassword } = require('../middleware/PasswordHandler')

const CreateUser = async (req, res, next) => {
    console.log('REQUEST BODY', req.body)
    try {
      const body = req.body
      const password = await generatePassword(body.password)
      const user = new User({
              username: body.username,
              email: body.email,
              password
            })
      await user.save()
      passport.authenticate('local', {
          successFlash: 'Successful login, welcome.',
          successRedirect: '/user/profile',
          failureFlash: 'Invalid Credentials',
          failureRedirect: 'user/login'
      })(req, res, next)
    }
    catch(err)  {
        console.log('Error creating a user', err)
    }
}

const UpdateUser = async (req, res) => {
  console.log(req.body)
  try {
    const user = await User.findByIdAndUpdate(req.params.id, 
    {...req.body}, 
    {new: true, useFindAndModify: false})
    res.render('user/profile', { currentUser: user })
  }
  catch(err) {
   console.log('err updating user', err)
  }
}

const DeleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.redirect('/')
  }
  catch(err) {
    console.log('err deleting user', err)
  }
}

module.exports = {
  CreateUser,
  UpdateUser,
  DeleteUser
}