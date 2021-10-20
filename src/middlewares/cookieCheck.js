module.exports = (req,res,next) => {
    if(req.cookies.craftsyForEver){
        req.session.userLogin = req.cookies.craftsyForEver;
    }
    next()
}