import * as express from 'express'
import homescreen from './defaults'

export default router => {
    router.use('/hello', homescreen)    
}