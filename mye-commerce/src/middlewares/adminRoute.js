module.exports = (req,res, next) => {
    if(req.session.user.status == 2) {
        next()
    } else {
        res.redirect('/');
    }
}