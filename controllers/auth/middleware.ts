function middleware(req, res, next) {
    if(req.session.auth) {
        // already authenticated users need not see these pages
        res.redirect('/')
    } else {
        next()
    }
}

export default middleware