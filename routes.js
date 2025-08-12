const express = require('express')
const userController = require('./controllers/userController.js')
const bookController  = require('./controllers/bookController.js')
const jobController  = require('./controllers/jobController.js')
const applctnController = require('./controllers/applctnController.js')

const jwt = require('./middleware/jwtmiddleware.js')
const multerConfig= require('./middleware/multerMiddleware.js')
const pdfMulterConfig= require('./middleware/pdfMulterMiddleware.js')


const routes = new express.Router()

routes.post('/register',userController.registerController)

routes.post('/login',userController.loginController)

routes.post('/google-login',userController.googleLoginController)

routes.get('/home-books',bookController.homeBooksController)

routes.get('/all-jobs',jobController.getAllJobsController)

// to edit profile
routes.put('/update-profile',jwt,multerConfig.single('profile'),userController.updateProfilecontroller)


// ------------users------------

routes.post('/add-book',jwt,multerConfig.array('uploadImgs',3), bookController.addBookController)
routes.get('/all-books-user',jwt,bookController.getAllBooksUser)

// view book
routes.get('/view-book/:id',bookController.viewBookController)
// get all user added books
routes.get('/all-added-books',jwt,bookController.UserAddedBooksController)

// get all purchased books
routes.get('/all-Purchased-books',jwt,bookController.purchasedBooksController)

// to delete a book
routes.delete('/delete-book/:id',bookController.deleteBookController)

// to apply for job
routes.post('/add-application',jwt,pdfMulterConfig.single('resume'),applctnController.addApplctnsController)

// path to payment
routes.put('/make-payment',jwt,bookController.paymentController)

// --------------admin------------

// get all boooks
routes.get("/all-books",bookController.getAllBooksAdminController)

// to approve book
routes.put('/approve-book/:id',bookController.approveBookController)

// to get all users 
routes.get('/all-users',userController.getAllUsersController)

// to add job
routes.post('/add-job',jobController.addJobController)

routes.delete('/delete-job/:id',jobController.deleteJobController)

// get all applications
routes.get('/all-applications',applctnController.getALlApplctnsController)

module.exports = routes
