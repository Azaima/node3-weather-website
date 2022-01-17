const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2c2ef76d7c3fbb67362cc416ce802663&query=' + lat + ',' + long + '&units=m'
    
    request({url: url, json: true}, (error, {body} = {}) => {
        if (error || body.error) {
            var errorResponse = error ? error : body.error
            callback(errorResponse, undefined)
        }   else {
                
            const {name, region, country} = body.location
            const {temperature, feelslike, precip, wind_speed, humidity, wind_degree, wind_dir} = body.current
            var wind_direction = ''
            switch (wind_dir) {
                case 'N':
                    wind_direction = 'North'
                    break

                case 'E':
                    wind_direction = 'East'
                    break

                case 'S':
                    wind_direction = 'South'
                    break

                case 'W':
                    wind_direction = 'West'
                    break

                default:
                    wind_direction = wind_dir
            }
            console.log(body.current)

            callback (undefined, 'It is currently ' + temperature + ' degrees, but it feels like ' 
            + feelslike + '. The humidity is '+ humidity+'% with a '+ precip+'% of rain. Wind is blowing at ' 
            + wind_speed + 'Km/h with a direction of ' + wind_degree + ' degrees ' + wind_direction + '.')
        }
        
    })
}

module.exports = forecast