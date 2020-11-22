const { User } = require('../db/schema')
const passport = require('../middleware/passportConfig')
const { generatePassword } = require('../middleware/PasswordHandler')

const CreateUser = async (req, res, next) => {
    console.log('REQUEST BODY', req.body)
    try {
      const body = req.body
      const password = await generatePassword(body.password)
      // Passwords matched, so now we'll create a new user
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
        res.redirect('/user/signup')
    }
}


module.exports = {
  CreateUser,
}