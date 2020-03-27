const request = require('request')

const geocode = (address, callback) => {
    const locationName = encodeURIComponent(address)
    const locationURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + locationName + '.json?access_token=pk.eyJ1Ijoiam9zY2tpbSIsImEiOiJjazE5bHV1Y2gwc3BjM2R0YmNnMmVyZW5uIn0.ryj1YpqPQAD6hQLcv0p2lQ'

    console.log(locationURL)
    request({url: locationURL, json: true}, undefined, (error, response) => {
        if(error)
        {
            console.log(error)
            callback('Error: Failed to connect to location server', undefined)
        }
        else if(response.body.features.length <= 0)
        {
            callback('Error: Unable to find location', undefined)
        }
        else
        {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode