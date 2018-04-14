import login from './login'
import register from './register'
import logout from './logout'
import redirectAuthenticated from '../../middlewares/AuthenticatedUsers/redirectAuthenticated'

export default router => {
    router.use('/', login)
    router.use('/', register)    
    router.use('/', logout)
}