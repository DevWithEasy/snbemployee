const router = require('express').Router();
const multer = require('multer');
const {employeeAllGetController,employeeAddGetController,employeeAddPostController,employeeGetController,employeeUpdateGetController,employeeUpdatePostController,
employeeDeleteController} = require('../controllers/employee')

//multer photo upload management
const storage = multer.diskStorage({
    destination:function (req, file, cb){
        cb(null,'./public/upload')
    },
    filename:function (req, file, cb){
        cb(null,file.fieldname+Date.now()+file.originalname)
    }
})
const upload = multer({
    storage:storage
}).single('photo')


//add emplyee form handler route
router.get('/', employeeAllGetController)

//add emplyee form handler route
router.get('/add', employeeAddGetController)

//add emplyee post form handler route
router.post('/add',upload,employeeAddPostController)

//single employee status
router.get('/details/:id', employeeGetController)

//update form handler route
router.get('/update/:id', employeeUpdateGetController)

//update employee status
router.post('/update/:id', employeeUpdatePostController)


//delete employee status
router.delete('/:id', employeeDeleteController)


module.exports = router