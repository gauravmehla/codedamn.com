import home from './home'
import auth from './auth'
import panel from './panel'
import hello from './hello'

export default router => {
    home(router)
    auth(router)
    panel(router)
    hello(router)
}