const mongoose = require('mongoose')
const  EmployeeSchema = mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    section:{
        type:String,
        required:true,
    },
    designation:{
        type:String,
        required:true,
    },
    salary:{
        type:String,
        required:true,
    },
    nid:{
        type:String,
        required:true,
    },
    dob:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    joining:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['Active', 'Closed'],
        default: 'Active'
    },
    photo:{
        type:String,
        required:true,
    }
})

const Employee = mongoose.model('Employee',EmployeeSchema)

module.exports = Employee