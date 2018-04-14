import * as express from 'express'
import User from '../../models/user'
import { user } from '../../interfaces/user'
import * as xdebug from 'debug'

const debug = xdebug('cd:Hello')

const router = express.Router()

router.get('/', (req, res) => {
    res.render('hello/index', { layout: 'hello' })
})

router.post('/', async (req, res) => {
    const doneprogrammingbefore = req.body.doneprogrammingbefore
    let tags = req.body.tags
    // TODO: Add validation of responses here by looking at frontend
    if(req.body.doneprogrammingbefore === "no") {
        tags = []
    }

    try {
        debug(req.session)
        const user: user = await User.findDamner({username: req.session.user})
        user.firstTime = false
        user.ltags = tags
        req.session.firstTime = false
        await user.save()
        res.json({
            success: true
        })
    } catch(e) {
        debug(e)
        res.json({success: false})
    }

})

export default router