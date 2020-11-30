// Require environment variables
require('dotenv').config()
// Require node modules
let passport = require('passport')
// Require any Strategies (AKA types of auth) we want to use
let LocalStrategy = require('passport-local').Strategy
// Require method to check hashed password
const { checkPassword } = require('./PasswordHandler')
// Import a reference to our database
const { User } = require('../db/schema')
// Serialization and Deserialization functions
// These are for passport to use in order to store/lookup the user info
// SERIALIZE: Reduce a user object to just its id field
passport.serializeUser((user, done) => {
    // Call the callback function with the user id as an argument
    // done(error, id) - pass a null if no error
    done(null, user._id)
})
// DESERIALIZE: Reverse the process of the serialize function
// In other words, take a user's ID and return the full user object
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    }
    catch(err) { throw err }
})

// LOCAL STRATEGY: Using a database that we manage ourselves (not OAuth)
passport.use(new LocalStrategy(
    { usernameField: 'email', passwordField: 'password'}, 
    async (email, password, done) => {
    // Try looking up the user by their email
    try {
        const user = await User.findOne({ email: email  })
        if (user &&(await checkPassword(password, user.password))) done(null, user) 
        else done(null, null)
    }
    catch(err) { throw err }
}))
// Make sure we can include this file into other files
module.exports = passport



// searchtrack.php?s={Artist_Name}&t={Single_Name}

// ^^ theaudiodb key