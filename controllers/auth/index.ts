import login from './login'
import register from './register'
import redirectAuthenticated from '../../middlewares/AuthenticatedUsers/redirectAuthenticated'

export default router => {
    router.use('/', login)
    router.use('/', register)    
}