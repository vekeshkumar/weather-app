const path = require('path')
const { response } = require('express')
const express = require('express')
const hbs = require('hbs')

const app = express() // calling the express
//For heroku
const port = process.env.PORT || 3000

//Include the util files 
const forecast = require('./utils/forecast.js')
const geocoding = require('./utils/geocode.js')
const { isObject } = require('util')

//Define paths for Express config

const publicDirectoryPath = path.join(__dirname,'../publlic')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//setup handlebars engine and views location
app.set(('view engine'),'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


//Routing file to get the pages
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Vekesh Kumar',
        forecast :'Clear'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Vekesh Kumar'
    })
})
app.get('/help',(req,res)=>{
    
    res.render('help',{
        helpText :' This is some sample help text',
        title:'Help',
        name: 'Vekesh Kumar',
        msg:'this is msg',

    })
})
app.get('',(req,res)=>{  //request,response
    res.send('<h1>Hello Express JS!</h1>')
})

//Get the weather details
app.get(('/weather'),(req,res)=>{
    if(!req.query.address){       
        return res.send({
            error: 'Address for the weather forecast is not provided.'
        })
    }
    geocoding(req.query.address,(error,{latitude,longitude,location}={})=>{ //{} default parameter values, if the given data is empty or not making sense
        if(error){return res.send({error})
        }else{
            forecast(latitude,longitude,(error, forecastData)=>{
                if(error)
                {
                    return res.send({error:'Some error occured in the forecast'})
                }else{
                    res.send({
                        forecast:forecastData,
                        location,
                        address:req.query.address
                    })
                   
                }
            })
        }
    })
})

//get current location weather
//Get the weather details
app.get(('/weather/current'),(req,res)=>{
    if(!req.query.address){       
        return res.send({
            error: 'Address for the weather forecast is not provided.'
        })
    }else{    
        console.log(req.query.address.toString())
        const query = JSON.parse(req.query.address)
        console.log(query.latitude)
        forecast(query.latitude,query.longitude,(error, forecastData)=>{
            if(error)
            {
                return res.send({error:'Some error occured in the forecast'})
            }else{
                console.log(forecastData)
                res.send({
                    forecast:forecastData,
                    address:req.query.address
                })
                
            }
        })
    }
})

app.get(('/products'),(req,res)=>{
    if(!req.query.search){
        //Stopping execution if not present 
        return res.send({
            error: 'You must provide an search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get(('*'),(req, res)=>{
    res.render('404',{
        title:'This is some text in 404',
        name:'Vekesh',
        errorMessage:'Page not found!'})
})

//Specific help 404 
app.get(('/help/*'),(req,res)=>{
    res.render(('404'),({
        title:'This is some helpful txt',
        name:'Vekesh',
        errorMessage:'Help article not found'
    }))
    
})

//Create and render a 404 page with handlebars
//starting the server - single time initation
app.listen(port,()=>{
    console.log('Server is up on the port '+port)
})


//app.get - resource from specific url , route
/*console.log(__dirname)
console.log(path.join(__dirname,'../'))
app.get('/help',(req,res)=>{
    res.send({
        name : 'Andrew',age :27
    })
})
app.get(('/about'),(req,res)=>{
    res.send('<h2>This is the About page</h2>')
})*/

/*
GOal : Update weather endpoint to accept the address
No address ? send back an error message
Address Send back the static JSON
Add address property onto JSON which return the provided address 
Test /weather and /weather?address=philadelphia

Goal 2:

Wire up /weather
1.Require geocode /forecast into app.js
2.Use the address to geocode
3.Use the coordinates to get forecast
4.Send back the real forecast and location

*/

/*
{
  request: {
    type: 'LatLon',
    query: 'Lat 45.42 and Lon -75.69',
    language: 'en',
    unit: 'm'
  },
  location: {
    name: 'Ottawa',
    country: 'Canada',
    region: 'Ontario',
    lat: '45.417',
    lon: '-75.700',
    timezone_id: 'America/Toronto',
    localtime: '2022-02-06 02:10',
    localtime_epoch: 1644113400,
    utc_offset: '-5.0'
  },
  current: {
    observation_time: '07:10 AM',
    temperature: -19,
    weather_code: 116,
    weather_icons: [
      'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png'
    ],
    weather_descriptions: [ 'Partly cloudy' ],
    wind_speed: 13,
    wind_degree: 200,
    wind_dir: 'SSW',
    pressure: 1034,
    precip: 0,
    humidity: 70,
    cloudcover: 75,
    feelslike: -19,
    uv_index: 1,
    visibility: 24,
    is_day: 'no'
  }
}




*/