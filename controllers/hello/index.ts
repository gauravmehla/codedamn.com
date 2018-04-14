import * as express from 'express'
import homescreen from './defaults'
import redirectHello from '../../middlewares/UnauthenticatedUsers/redirectHello';

export default router => {
    router.use('/hello', redirectHello, homescreen)    
}