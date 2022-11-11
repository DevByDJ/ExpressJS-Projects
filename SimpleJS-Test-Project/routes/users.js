const e = require('express')
const express = require('express')

// Instead of the app accessing these routes directly, we will use a router thats called in the main app.
const router = express.Router()



router.get('/', (req, res) => {

  res.send("User List")

})

router.get('/new', (req, res) => {

  res.render("users/new")

})


/**
 * ! Remember '.post' creates requests or responses for the router to send to the application.
 * * This post function will push the firstName acquired by the new.ejs page into the 'users' stack created below, then it will
 * * redirect the user to the /users/(userCreatedID) page to display information.
 * ? [Else] it will log an "Error" message to the user and re-render the entered name to the user. 
 */


router.post('/', (req, res) => {

  const isValid = true

  if(isValid)
  {
    users.push({ firstName: req.body.firstName})
    res.redirect(`/users/${users.length - 1}`)
  }
  else
  {
    console.log("Error")
    res.render('users/new', { firstName: req.body.firstName})
  }

})

// * ============================================================================================================================== End of Block


// /*
// * Can use a dynmaic variable 'id' that's able to changed depending whats assigned to it and display it when its called.
// ? There is a much cleaner method of coding this. Please see the next block of code.
// **/
// router.get('/:id', (req, res) => {
  
  
//   res.send('Get user with ID ' + req.params.id)

// })

// router.put('/:id', (req, res) => {
  
  
//   res.send('Update user with ID ' + req.params.id)

// })

// router.delete('/:id', (req, res) => {
  
  
//   res.send('Delete user with ID ' + req.params.id)

// })
// // * ================================================================================================================= End of Block




/*
! Using router.route()
* Cleaner way of writing the code above.
* Uses router.route to string together multiple accessors such as get, put and delete without having to redeclare the route ('/:id')
**/

router
  .route('/:id')
  .get((req, res) => {
    console.log(req.user)
    res.send('Get user with ID ' + req.params.id)
  })
  .put((req, res) => {
    res.send('Update user with ID ' + req.params.id)
  })
  .delete((req, res) => {
    res.send('Delete user with ID ' + req.params.id)
  })

// * ============================================================================================================================== End of Block



// The array that holds users pushed to them by a 'post' request and has two predefined user names 
const users = [{ name: "Danny"}, { name: "Jacob"}]


/** 
* ! Using router.param()
* ? Whenever you would like to run a block of code when a route is accessed use the 'param' function
* ? Remember, this runs before any other logic. You will need to use next() to run any additional code.
* @param("[route]", (req res, next, [dynamic variable]) => {})  
*/

router.param("id", (req, res, next, id) => {
  req.user = users[id]
  next()                                                        //! next() is required to run any additional code.
})

// * ============================================================================================================================== End of Block



// Exports this module as a router to be called by the main app.
module.exports = router 