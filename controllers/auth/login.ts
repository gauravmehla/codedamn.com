import * as express from 'express'
import * as xdebug from 'debug'
import User from '../../models/user'
import redirectAuthenticated from '../../middlewares/AuthenticatedUsers/redirectAuthenticated';

import { user } from '../../interfaces/user'

const router = express.Router()
const debug = xdebug('cd:Login')

router.get('/login', redirectAuthenticated, (req, res) => {
    if(req.query.error !== undefined) {
        return res.render('home/login', { layout: 'auth', title: 'Login', error: true })
    }
    return res.render('home/login', { layout: 'auth', title: 'Login' })
})

// handle username-password logins
router.post('/login', redirectAuthenticated, async (req, res) => {
    // TODO: Put invisible captcha on login page
    const username = req.body.username
    const password = req.body.password
    const data: user = await User.findDamner({username, password})
    if(data) {
        // user exists
        // TODO: create a session
        debug('User exists. Creating a session')
        req.session.user = data.username
        req.session.auth = true
        req.session.firstTime = data.firstTime
        res.redirect('/panel')
    } else {
        debug('Invalid login')
        res.redirect('/login?error')
    }
})

export default router