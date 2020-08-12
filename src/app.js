const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./Utils/geocode')
const forecast = require('./Utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()


//Define paths for express config.
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


//Setup handler bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('' ,(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name:'Raghav'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title:'About me',
        name:'Raghav dada'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title:'Help',
        name:'Raghav'
    })
})
// app.get('', (req, res) => {
//     res.send('<h1 style="color:blue;">Weather</h1>')
// })

// app.get('/help', (req,res) => {
//     res.send([{
//         name: 'Andrew',
//         Age: 27
//     },{
//         name: 'Raghav',
//         Age: 19
//     }])
// })



// app.get('/about', (req, res) => {
//     res.send('<h2>About Page</h2>')
// })

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error:'you must provide an address'
        })
        
    }

    geocode(req.query.address, (error, {latitude, longitude ,location} = {}) => {
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(latitude,longitude, (error, data) => {
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                forecastdata:data,
                location,
                address:req.query.address
            })
        })
    })
    // res.send({
    //     forecast: '50 degrees' ,

    //     location:'pji;aedaphia0',
    //     address:req.query.address

    // })

    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
            error:'You must provide a search term'
        })

    }


    console.log(req.query.search)
    res.send({
        products:[]
    })
})

// app.com
// app.com/help
// app.com/about

app.get('/help/*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'Raghaav',
        errorMessage:'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'Raaghav', 
        errorMessage:'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})