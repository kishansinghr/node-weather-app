const request = require('request');

const geocode = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fddcd4513aba1583c688cae51ff9a86f&query=' + encodeURIComponent(address) + '&units=f';
console.log(url);
    request({ uri: url, json: true }, (error, { body }) => {

        if (error) {
            callback('Could not connect to weather API', undefined);
        } else if (body.error) {
            callback('Could not find result, please try with different result', undefined);
        } else {
            const {lat, lon, name: locationName, region, country } = body.location;

            callback(undefined, {
                lat: lat,
                lon: lon,
                location: locationName + ", " + region + ", " + country
            });
        }
    })
}

module.exports = geocode;