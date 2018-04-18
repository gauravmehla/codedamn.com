import initConfig from './startup/config'
import * as express from 'express'
import * as session from 'express-session'
import * as xdebug from 'debug'
import * as mongoose from 'mongoose'
import * as Config from 'config'
import * as vhost from 'vhost'
import * as Store from 'connect-mongo'
import learn from '../learn.codedamn.com/' // UNCOMMENT THIS IF YOU HAVE learn.codedamn.com cloned
import www from './'

async function boot() {
	
	const MongoStore = Store(session)
	
	// Check if environment variables are defined
	await mongoose.connect(Config.get('dbConnectionString'))
	initConfig()

	const app = express()
	const debug = xdebug('cd:index')
	const portNumber = process.env.PORT || Config.get('portNumber')

	
	const store = new MongoStore({ mongooseConnection: mongoose.connection })
	
	const codedamn = {
		learn: learn(store), // UNCOMMENT THIS IF YOU HAVE learn.codedamn.com cloned
		www: www(store)
	}

	app.use(vhost('cd.test', codedamn.www)) // For development only
	app.use(vhost('learn.cd.test', codedamn.learn)) // UNCOMMENT THIS IF YOU HAVE learn.codedamn.com cloned

	app.listen(portNumber, () => debug(`Server up and running at http://cd.test:${portNumber}`))
}

boot()