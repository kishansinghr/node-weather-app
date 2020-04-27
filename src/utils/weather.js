const request = require('request');

const weather = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fddcd4513aba1583c688cae51ff9a86f&query='
        + encodeURIComponent(lat) + ',' + encodeURIComponent(lon) + '&units=f';

    request({ uri: url, json: true }, (error, {body}) => {

        if (error) {
            callback('Could not connect to weather API', undefined);
        } else if (body.error) {
            callback('Could not find result, please try with different query',undefined);
        } else {
            const {temperature:temp, feelslike} = body.current;

            callback(undefined, 'Current temprature is ' + temp + ' degrees But feels like it\'s ' + feelslike + ' degress.');
        }
    })
}

module.exports = weather;