require('dotenv').config()
const express = require('express');
const mongoose  = require('mongoose');
const path = require('path');
const Employee = require('./models/employee')

const employeeRouter = require('./routers/employee')
const searchRouter = require('./routers/search')


const app = express();
const URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uwkx2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(URL)
.then((res) => {
    console.log('Database connected successfully')
})

app.set('view engine', 'ejs');

const middleware = [
    express.static('public'),
    express.urlencoded({extended: true}),
    express.json()
]

app.use(middleware)

app.use('/employee',employeeRouter);
app.use('/search',searchRouter);

//get all employee status
app.get('/',async (req, res)=> {
    try{
        const data = await Employee.find()
        res.render('pages/index',{title:'S&B Nice Food Valley Ltd',employees:data})
    }catch(err){
        res.json({msg: err})
    }
})


app.listen(process.env.PORT || 3001);