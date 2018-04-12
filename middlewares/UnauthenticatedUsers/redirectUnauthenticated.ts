import * as xdebug from 'debug'
const debug = xdebug('cd:redirectUnauthMW')


function redirectUnauthenticated(req, res, next) {
    debug(res.session)
    if(!req.session.auth) {
        res.redirect('/login')
    } else {
        next()
    }
}

export default redirectUnauthenticated