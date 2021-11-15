const express = require('express') 
const path = require("path")
const hbs = require("hbs")
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log(__dirname)
console.log(path.join(__filename))


const app = express() 
const port = process.env.PORT || 3000
// Define paths for Express config
const publiDirPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, "../templates/partials/")
console.log(publiDirPath)

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publiDirPath))

const myName = process.argv[2]
app.get('', (req,res) =>{
    res.render('index',{
        name: 'Shanmuk',
        title:'Weather'
    })
})

app.get('/about',(req,res) =>{

    res.render('about',{
        name: "Shanmuk",
        age: 23,
        title: 'About'
    })

})


app.get('/help', (req,res)=>{

    res.render('help',{
        name: "Shanmuk",
        website: "www.google.com",
        title: "Help"
    })
})

app.get('/help/*', (req,res)=>{

    res.render('error_404',{
        name: "Shanmuk",
        title: "Help Article Not Found"
    })
})

app.get("/weather", (req,res) =>{
    
    if(!req.query.address){
        return res.send({
           error:  "please provide valid address"
        })
   
    }
    geocode(req.query.address, ( error, {latitude, longitude, location } = {} ) => {

        if(error){
            return res.send({ error})
        }
        
        forecast(latitude, longitude, (error, forecastData) => { 
        
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
            
        })
    })

})


app.get('*', (req,res) =>{

   res.render('error_404',{
        name: "Shanmuk",
        title: "Page Not Found"
   })

})




app.listen(port, () =>{

    console.log("Server is up and running on port" + port)
}) 














// app.get('', (req,res) =>{

//     // res.send("<h2>Hello Express!!!</h2>") //html
//     // res.send({                             // json 
//     //     name: "shanmuk",
//     //     age: 23
//     // })
//     res.send([{

//         name:"Shanmuk",
//         age: 23
//     }, 
//     {
//         name:"Anudeep",
//         age: 23
//     }

// ])


// }) 


// app.get('/help',(req,res) =>{

//     res.send("Help page")
//  }) 
 
//  app.get('/about',(req,res)=>{
 
 
//      res.send("<h1>About page</h1>")
//  })
 
//  app.get("/weather", (req,res) =>{
 
//      res.send({

//         forecast: 50,
//         locaion: "Allagadda"
//      })
//  })



