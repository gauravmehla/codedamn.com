import home from './home'
import auth from './auth'
import panel from './panel'

export default router => {
    home(router)
    auth(router)
    panel(router)
}