const request = require('request')


const geocode = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGhlYXJ0b2Z3YXIiLCJhIjoiY2wwamt2aGgzMDFyajNpb2Q0c3hpOGJpYiJ9.WN6L5uV9lbX6lc_pCnNh5w&limit=1';

    request({ url: geocodeURL, json: true }, (error, response) => {
        if (error) {
            callback('Uh-oh! Something went wrong and system is unable to connect to the server.',undefined)
        }
        else if (response.body.features.length == 0) {
            callback('Unable to find the location!',undefined);
        }
        else {
            const latitude = response.body.features[0].center[0]
            const longitude = response.body.features[0].center[1]
            const location =response.body.features[0].place_name
            callback(undefined,{latitude, longitude,location})
        }
    })
}

module.exports = geocode
