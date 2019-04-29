//exports.APP_PORT = 8000
exports.SESSION_LIMIT = [3, 'hours']






// ========================================================
// CONFIGURATION BASED ON ENVIRONMENT
// ========================================================
if (process.env.NODE_ENV != 'production') {
    var baseUrl = "https://yourdomain.com"
}
else {
    var baseUrl = "localhost:8000" 
}

exports.BASE_URL = baseUrl


exports.BASE_API = baseUrl + '/api/v1'