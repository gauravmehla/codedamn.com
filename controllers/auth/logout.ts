import * as express from 'express'
import * as xdebug from 'debug'

import redirectAuthenticated from '../../middlewares/AuthenticatedUsers/redirectAuthenticated'

const router = express.Router()
const debug = xdebug('cd:Logout')

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login?logout')
    })
})

export default router