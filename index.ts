import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as path from 'path'
import * as exphbs from 'express-handlebars'
import routes from './controllers'
import * as helmet from 'helmet'
import * as xdebug from 'debug'
import * as mongoose from 'mongoose'
import * as session from 'express-session'
import { cookieSecret } from './secrets'
import * as cookieParser from 'cookie-parser'
import * as Store from 'connect-mongo'

const MongoStore = Store(session)

async function boot() {
	const app = express()
	const debug = xdebug('cd:index')

	await mongoose.connect('mongodb://localhost/codedamn')

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

	app.use(cookieParser(cookieSecret)) // signing and parsing cookies

	app.use(session({
		secret: cookieSecret,
		resave: false,
		saveUninitialized: true,
		cookie: { secure: 'auto' }, // secure cookies on HTTPS (prod) ; insecure on HTTP (dev)
		store: new MongoStore({ mongooseConnection: mongoose.connection })
	}))

	routes(app) // register routes

	app.listen(1337, () => debug('Server up and running at localhost:1337'))
}

boot()