import * as express from 'express'
import * as xdebug from 'debug'
import User from '../../models/user'
import * as fetch from 'node-fetch'
import * as Config from 'config'

const router = express.Router()
const debug = xdebug('cd:Register')
const reCAPTCHAsecret = Config.get('reCAPTCHAsecret')
const captchSiteKey = Config.get('captchSiteKey')


router.get('/register', (req, res) => {
    res.render('home/register', { layout: 'auth', title: 'Register', captchSiteKey: captchSiteKey })

})

router.post('/register', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    const cpassword = req.body.cpassword

    const captcha = req.body['g-recaptcha-response']

    const result = await fetch(`https://www.google.com/recaptcha/api/siteverify?response=${captcha}&secret=${reCAPTCHAsecret}`, {
        method: 'GET'
    })

    const json = await result.json()

    if(json.success) {
        const errors = await User.create({
            name: 'something',
            username,
            email,
            password
        })
        if(errors.length == 0) {
            res.json({code: 200, errors: null})
        } else {
            res.json({code: 200, errors})
        }
    } else {
        // TODO: Add valid response
        res.json({code: 500})
    }
})

export default router