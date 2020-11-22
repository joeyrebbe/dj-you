module.exports = (req, res, next) => {
    // user logged in? if yes, proceed as planned, if no, send back to login page
    if (req.user) next() 
    else {
        req.flash('error', 'Invalid Credentials')
        res.redirect('/auth/login')
    } 
}