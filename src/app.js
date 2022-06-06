const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialspath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Vipul Sharma'
    })
})

app.get('/weather',(req,res)=>{
    const address = req.query.address;
    if(!req.query.address){
        return res.send({error: 'Please provide an address!'})
    }
    else{
        geocode(address, (error,data={})=>{
            if(error){
                return res.send({error: error});
            }
            //console.log(data);
            forecast(data, (error,info={})=>{
                if(error){
                    return res.send({error: error})
                }
                
                return res.send( info)
                
            })  
        })

    }
    
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About ',
        name: 'Vipul Sharma'
    })
})
app.get('/about/*',(req,res)=>{
    res.render('404',{
        title: '404',
        text: 'About page is not here, you dummy!',
        name: 'Vipul Sharma'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        contact_detail: 'sharma.57@iitj.ac.in',
        name: 'Vipul Sharma',
        alternate_email: 'vipulsharma.rm@gmail.com'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        text: 'Help page is not here, you dummy!',
        name: 'Vipul Sharma'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        text: '404! page not found!',
        name: 'Vipul Sharma'
    })
})

app.listen(port, () => {
    console.log("Server is up and running!")
})

