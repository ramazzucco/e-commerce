module.exports = (req,res, next) => {
    if(req.session.user) {
        console.log("hay session de usuario")
        next()
    } else {
        console.log("NO hay session de usuario")
        res.redirect('/users/register');
    }
}