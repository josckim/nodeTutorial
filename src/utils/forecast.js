const request = require('request')

const forecast = (lat, long, callback) => {
    const weatherUrl = 'https://api.darksky.net/forecast/b2ac07ba81a372596d682ab4678639f3/' + encodeURIComponent(lat) +',' + encodeURIComponent(long)

    request({url: weatherUrl, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location service', undefined)
        }
        else if(body.error) {
            callback(response.body.error, undefined)
        }
        else {
            const weather = {
                dailySum: body.daily.summary,
                temperature: body.currently.temperature,
                percipChance: body.currently.precipProbability
            }
            callback(undefined, weather.dailySum + ' Temperature is ' + weather.temperature + ' degrees F, with a ' + weather.percipChance + '% chance of rain.')
        }
    })
}

module.exports = forecast