import * as express from 'express'
import User from '../../models/user'
import { user } from '../../interfaces/user';
const router = express.Router()

router.get('/', async (req, res) => {
    const firstTime: Boolean = req.session.firstTime || (await User.findDamner({username: req.session.user})).firstTime

    if(firstTime) {
        return res.redirect('/hello')
    }

    res.render('panel/index', { layout: 'panel' })
})

export default router