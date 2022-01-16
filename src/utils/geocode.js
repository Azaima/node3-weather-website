const request = require('request')

const geocode = (location, callback) => {
    const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token=pk.eyJ1IjoiYS16YWltYSIsImEiOiJja3lkNjBtMWQwMGdlMnJwbTB0c25odHhuIn0.fv1hi36tRsdsWNVvQxkmUA&limit=1'

    request({url: geoURL, json: true}, (error, {body} = {}) => {
        if (error || body.message) {
            var returnedError = error ? error : body.message
            callback(returnedError, undefined)
        }  else if (body.features.length == 0) {
            callback('Location not found!', undefined)
        }  else {
            const {place_name, center} = body.features[0]
            callback(undefined, {latitude: center[1], longitude: center[0], location: place_name})
        }
    })
}

module.exports = geocode