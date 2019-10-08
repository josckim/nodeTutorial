const request = require('request')

const geocode = (address, callback) => {
    const locationUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoiam9zY2tpbSIsImEiOiJjazE5bHV1Y2gwc3BjM2R0YmNnMmVyZW5uIn0.ryj1YpqPQAD6hQLcv0p2lQ&limit=1'
    
    request({url: locationUrl, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location services', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode