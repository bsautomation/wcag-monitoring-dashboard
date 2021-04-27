var os = require('os');
var hostname = os.hostname();
var is_local = hostname.includes('MBP') || hostname.includes('MacBook') || hostname.includes('internal') || hostname.includes('local');
var config = require('./config/config.json')

exports.API_ENDPOINT = is_local ? 'http://localhost:3005' : 'https://api-wcag-monitoring.bsstag.com'
exports.GOOGLE_CLIENT_ID = config.google_auth.client_id
exports.CONFIG = config