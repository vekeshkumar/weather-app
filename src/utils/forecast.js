const request = require('postman-request')
const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=15c068fde32ec8ae2a36899188c3afc1&query=' + lat + ',' + long + '&units=m'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to access the forecast service', undefined)
        }
        else if (body.error) {
            callback('Unable to reach the service, Please try again with different input!!', undefined)
        } else {
            console.log(body);
            callback(undefined, { location: body.location, weather_details: body.current })
        }
    })
    //weather_descriptions throughout the day. It is currently  degrees outerHeight. There is  chance of rain.
}
module.exports = forecast