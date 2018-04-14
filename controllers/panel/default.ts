import * as express from 'express'
const router = express.Router()

router.get('/', (req, res) => {

    if(req.session.firstTime) {
        return res.redirect('/hello')
    }

    res.render('panel/index', { layout: 'panel' })
})

export default router