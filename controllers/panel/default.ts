import * as express from 'express'
import User from '../../models/user'
import { user } from '../../interfaces/user'
import * as xdebug from 'debug'

const router = express.Router()
const debug = xdebug('cd:panel')

router.get('/', async (req, res) => {
    debug(req.session)
    const firstTime: Boolean = req.session.firstTime || (await User.findDamner({username: req.session.user.username})).firstTime

    if(firstTime) {
        return res.redirect('/hello')
    }

    const name = req.session.user.name

    res.render('panel/index', { layout: 'panel', name: req.session.user.fullname })
})

export default router