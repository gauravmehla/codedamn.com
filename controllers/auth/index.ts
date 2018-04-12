import login from './login'
import register from './register'
import middleware from './middleware'

export default router => {
    router.use('/', middleware, login)
    router.use('/', middleware, register)    
}