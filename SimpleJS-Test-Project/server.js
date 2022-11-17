const express = require('express')
const path = require("path")

// Shows that the app will be using Express
const app = express()



//! To be able to view html, css, js related items you need to 'set' the view engine to ejs
app.set('view engine', 'ejs')

// Allows the app to use an Express feature to access html code directly
app.use(express.urlencoded({ extended: true}))

// Allows the app to use anything within the static folder public
app.use(express.static(path.join(__dirname, "public")))

// Telling your app that you will be using the function you created down below named 'logger'
app.use(logger)


app.get('/', (req, res) =>
{
  console.log('App is running..')
  res.render('index', {userName : 'Danny Joseph'})
})


// To access other routes create a new router with the label of the file you intend to 'route' to. 
const userRouter = require('./routes/users')

// App will now be using this router under '/users'
app.use('/users', userRouter)




/**
 * *  Creating a function and using it as Middleware (code that runs at the beginning of a request)
 * !  Middleware functions must have a next paramter in the function declaration.
 * @param: logger(req, res, next) 
 */

 function logger(req, res, next) {
  console.log("The current URL path is: " + req.originalUrl)
  next()
}




// Local Host declaration
app.listen(3000)