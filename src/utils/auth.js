import moment from 'moment'
import CONFIG from '../../CONFIG'

let isSessionNotExpired = (loggedAt) => {
    var dt = new moment()
    var logged = new moment(loggedAt).add(CONFIG.SESSION_LIMIT[0], CONFIG.SESSION_LIMIT[1])
    // console.log(dt.format('hh:mm:ss'))
    // console.log(logged.format('hh:mm:ss'))
    if (dt < logged)   //*1000 to convert seconds to ms
        return true
    return false
}

export const isLoggedIn = (authObj) => {
    if (authObj && authObj.token && authObj.username && isSessionNotExpired(authObj.loggedAt))
        return true
    return false
}