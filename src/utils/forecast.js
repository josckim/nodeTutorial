const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const lat = encodeURIComponent(latitude)
    const longi = encodeURIComponent(longitude)
    const weatherURL = 'https://api.darksky.net/forecast/b2ac07ba81a372596d682ab4678639f3/' + lat + ',' + longi

    console.log(weatherURL)
    request({url: weatherURL, json: true}, (error, response) => {
        if(error)
        {
            callback('Error: Unable to connect to forecast service', undefined)
        }
        else if(response.body.error)
        {
            callback('Error: Location is invalid, cannot find location', undefined)
        }
        else
        {
            const temp = response.body.currently.temperature
            const precipProb = response.body.currently.precipProbability
            const data = {
                summary: response.body.daily.data[0].summary,
                temp: response.body.currently.temperature,
                precipProb: response.body.currently.precipProbability
            }
            callback(undefined, data)
        }
    })
    
}


module.exports = forecast