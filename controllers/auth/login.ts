import * as express from 'express'
import * as xdebug from 'debug'
import User from '../../models/user'

const router = express.Router()
const debug = xdebug('cd:Login')

router.get('/login', (req, res) => {
    res.render('home/login', { layout: 'auth', title: 'Login' })
})

// handle username-password logins
router.post('/login', async (req, res) => {
    // TODO: Put invisible captcha on login page
    const username = req.body.username
    const password = req.body.password
    const data = await User.findDamner({username, password})
    if(data) {
        // user exists
        // TODO: create a session
        debug('User exists. Creating a session')
        req.session
        res.redirect('/')
    } else {
        debug('Invalid login')
        res.redirect('/login?error')
    }
})

export default router