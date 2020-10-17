const express = require('express')

const auth = require('./services/auth')

const userSessionController = require('./controllers/userSession')
const customerSessionController = require('./controllers/customerSession')

const userController = require('./controllers/user')
const filteredUserController = require('./controllers/filteredUser')
const userByLoginController = require('./controllers/userByLogin')

const customerController = require('./controllers/customer')
const filteredCustomerController = require('./controllers/filteredCustomer')
const customerByLoginController = require('./controllers/customerByLogin')

const updatePasswordController = require('./controllers/updatePassword')

const productController = require('./controllers/product')
const filteredProductController = require('./controllers/filteredProduct')

const serviceController = require('./controllers/service')
const filteredServiceController = require('./controllers/filteredService')

const requestController = require('./controllers/request')
const updateRequestStateController = require('./controllers/updateRequestState')

const uploader = require('./services/uploader')

const router = express.Router()

router.get('/', (req, resp, next) => {
    resp.json({
        message: `Api running on: ${ process.env.URL }...`
    })
})

/* Login route */
router.post('/login/user', userSessionController.create)
router.post('/login', customerSessionController.create)

/* Update user password route */
router.put('/user/:id', auth.authorize('user'), uploader, (req, resp, next) => { 
    if(req.body.password)
        req.params.resource = 'user'; 
    return next(); 
}, updatePasswordController.update)

/* Filtered user route */
router.get('/user/:id', auth.authorize('user'), filteredUserController.index)
/* User by Login route */
router.get('/user/login/:login', auth.authorize('user'), userByLoginController.index)
/* User routes */
router.get('/user', auth.authorize('user'), userController.index)
router.post('/user', auth.authorize('user'), uploader, userController.create)
router.put('/user/:id', auth.authorize('user'), userController.update)
router.delete('/user/:id', auth.authorize('user'), userController.delete)

/* Filtered customer route */
router.get('/customer/:id', auth.authorize(['user','customer']), filteredCustomerController.index)
router.get('/customer', auth.authorize('user'), filteredCustomerController.index)
/* Customer by login route */
router.get('/customer/login/:login', customerByLoginController.index)
/* Update customer password route */
router.put('/customer/:id', auth.authorize(['user','customer']), uploader, (req, resp, next) => { 
    if(req.body.password)
        req.params.resource = 'customer';
    return next();
}, updatePasswordController.update)
/* Customer routes */
router.get('/customer', auth.authorize('user'), customerController.index)
router.post('/customer', uploader, customerController.create)
router.put('/customer/:id', auth.authorize(['user','customer']), customerController.update)
router.delete('/customer/:id', auth.authorize('user'), customerController.delete)

/* Filtered product */
router.get('/product/:id', filteredProductController.index)
router.get('/product', filteredProductController.index)
/* Product routes */
router.get('/product', productController.index)
router.post('/product', auth.authorize('user'), uploader, productController.create)
router.put('/product/:id', auth.authorize('user'), uploader, productController.update)
router.delete('/product/:id', auth.authorize('user'), productController.delete)

/* Filtered service */
router.get('/service/:id', filteredServiceController.index)
router.get('/service', filteredServiceController.index)
/* Service routes */
router.get('/service', serviceController.index)
router.post('/service', auth.authorize('user'), uploader, serviceController.create)
router.put('/service/:id', auth.authorize('user'), uploader, serviceController.update)
router.delete('/service/:id', auth.authorize('user'), serviceController.delete)

/* Route to update a request state */
router.put('/request/:id', auth.authorize(['user','customer']), uploader, updateRequestStateController.update)
/* Request routes */
router.get('/request', auth.authorize(['user','customer']), requestController.index)
router.post('/request', auth.authorize('customer'), uploader, requestController.create)
router.put('/request/:id', auth.authorize(['user','customer']), requestController.update)
router.delete('/request/:id', auth.authorize('user'), requestController.delete)

module.exports = router