
import * as Config from 'config'
import * as xdebug from 'debug'

export default () => {
    let isError = false
    const debug = xdebug('cd:startup')
    
    // Check if cookieSecret is defined
    if (!Config.get('cookieSecret')) {
        isError = true
        debug('Please define the value for codedamn_cookieSecret')
    } else {
        debug('Defined codedamn_cookieSecret : ' + Config.get('cookieSecret'))
    }

    // Check if reCAPTCHAsecret is defined
    if (!Config.get('reCAPTCHAsecret')) {
        isError = true
        debug('Please define the value for codedamn_reCAPTCHAsecret')
    } else {
        debug('Defined codedamn_reCAPTCHAsecret : ' + Config.get('reCAPTCHAsecret'))
    }
    
    // Check if captchSiteKey is defined
    if (!Config.get('captchSiteKey')) {
        isError = true
        debug('Please define the value for codedamn_captchSiteKey')
    } else {
        debug('Defined codedamn_captchSiteKey : ' + Config.get('captchSiteKey'))
    }

    // Check if any value is missing then log it on console and terminate the process
    if (isError) {
        console.log('Please define the environment variables')
        process.exit(1);
    }
}