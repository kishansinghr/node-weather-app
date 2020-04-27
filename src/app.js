const path = require('path')
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const port = process.env.port || 3000;

const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express();
app.use(express.static(publicPath))
app.set('views', viewsPath);

app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        author: 'Kishansingh Rahtore'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        author: 'Kishansingh Rahtore'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        helpText: 'You will not get any help here, get lost',
        author: 'Kishansingh Rathore'
    });
});

app.get('/weather', (req, res) => {
    res.render('weather', {
        title: 'help',
        weather: 'current weather is not stable',
        author: 'Kishansingh Rathore'
    });
});

app.get('/weather/api', (req, res) => {

    if (!req.query.address) {
        return res.send({ error: 'Address is missing' });
    }

    geocode(req.query.address, (error, data) => {
        console.log(req.query.address);
        debugger;
        if (error) {
            return res.send({ error: error })
        }

        weather(data.lat, data.lon, (error, data1) => {
            if (error) {
                return res.send({ error: error });
            }
            console.log(data1);
            return res.send({
                forecast: data1,
                location: data.location,
                address: req.query.address
            });
        });
    });
});

app.get('*', (req, res)=>{
    return res.render('404', {
        title: '404',
        message: 'Resource not available',
        author: 'Kishansingh Rathore'
    });
});
app.listen(port, () => {
    console.log('Start listning on port ' + port);
});