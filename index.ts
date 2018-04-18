import * as express from 'express'
import * as path from 'path'
import * as helmet from 'helmet'
import * as Config from 'config'
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import * as exphbs from 'express-handlebars'
import * as session from 'express-session'
import * as Store from 'connect-mongo'
import routes from './controllers'

export default function(mongoose) {
    const MongoStore = Store(session)
    const app = express()

    if(process.env.NODE_ENV != 'production') { // not in production. Need express to serve static files
        app.use('/assets', express.static(path.join(__dirname, 'assets')))
    }

    // nginx is configured for static assets
    app.engine('.hbs', exphbs({
        extname: '.hbs',
        helpers: {
            inc: function(value, options) {
                return parseInt(value) + 1;
            }
        }
    }))
    app.set('view engine', '.hbs')
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false })) // parsing POST data

    app.use(helmet())

    app.use(cookieParser(Config.get('cookieSecret'))) // signing and parsing cookies

    const domain = process.env.NODE_ENV === 'production' ? '.codedamn.com' : '.cd.test'

    app.use(session({
        secret: Config.get('cookieSecret'),
        resave: false,
        saveUninitialized: true,
        cookie: { secure: 'auto',  }, // secure cookies on HTTPS (prod) ; insecure on HTTP (dev)
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    }))
    console.log('xxxx')

    routes(app) // register routes

    return app
}