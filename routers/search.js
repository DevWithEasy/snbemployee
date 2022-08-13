const router = require('express').Router();
const {searchGetController,searchPhoneController,searchIdController,searchNameController} = require('./../controllers/search')

// form handler route
router.get('/all', searchGetController)

// form handler route
router.post('/phone', searchPhoneController)

//update employee status
router.post('/id', searchIdController)

//update employee status
router.post('/name', searchNameController)

module.exports = router