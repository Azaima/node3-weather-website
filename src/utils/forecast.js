const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2c2ef76d7c3fbb67362cc416ce802663&query=' + lat + ',' + long + '&units=m'
    
    request({url: url, json: true}, (error, {body} = {}) => {
        if (error || body.error) {
            var errorResponse = error ? error : body.error
            callback(errorResponse, undefined)
        }   else {
                
            const {name, region, country} = body.location
            const {temperature, feelslike, precip} = body.current
            
            callback (undefined, 'It is currently ' + temperature + ' degrees, but it feels like ' 
            + feelslike + ' degrees with a '+ precip+'% of rain.')
        }
        
    })
}

module.exports = forecast