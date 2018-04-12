import * as xdebug from 'debug'
const debug = xdebug('cd:redirectAuthMW')


function redirectAuthenticated(req, res, next) {
    debug(req.session)
    if(req.session.auth) {
        // already authenticated users need not see these pages
        res.redirect('/')
    } else {
        next()
    }
}

export default redirectAuthenticated