const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//sets up index.html 
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Meow'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Bahh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'welp',
        name: 'ahhh'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address was not provided'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error: error
                })
            }
            
            return res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })   
})

app.get('/products', (req, res) => {
    
    if (!req.query.search) {
        return res.send({
            error: 'Provide Search Term'
        })
    }
    console.log(req.query)

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'heeelp',
        message: 'Help Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'wat',
        message: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})