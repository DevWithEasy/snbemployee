const Employee = require('../models/employee')

exports.employeeAllGetController=async(req,res,next)=>{
    try{
        const data = await Employee.find()
        res.render('pages/employee',{title:'S&B all employee status',employees:data})
    }catch(err){
        res.json({msg: err})
    }
}

exports.employeeAddGetController =async (req,res,next) => {
    res.render('pages/add',{title:'Create a employee data',alert:null})
}

exports.employeeAddPostController =(req,res,next) => {
    const {name,section,designation,salary,nid,dob,phone,joining,gender,address,status} = req.body

    //find data quary by section name
    Employee.find({section:section},(err,data)=>{
        if(err){
            res.json({error:err})
        }else{
            //data send server to database
            let employeeCount
            if(data.length<10){
                employeeCount = `00${data.length+1}`
            }else if(data.length<100){
                employeeCount = `0${data.length+1}`
            }else{
                employeeCount = data.length+1
            }
            //creat a section id for employee
            let id
            switch(section) {
                case "Biscuit":
                    id = `B-${employeeCount}`
                break
                case "Cake":
                    id = `Ck-${employeeCount}`
                break
                case "Bakery":
                    id = `Bk-${employeeCount}`
                break
                case "Wafer":
                    id = `W-${employeeCount}`
                break    
                case "Snacks":
                    id = `C-${employeeCount}`
                break   
                case "Water":
                    id = `Wt-${employeeCount}`
                break    
            }

            const employee = new Employee({
                id:id,name,section,designation,salary,nid,dob,phone,joining,gender,address,status,photo:req.file.filename
            })
            employee.save((err)=>{
                if(err){
                    res.render('pages/add',{title:'Create a employee data',alert:'yes'})
                    console.log(err)
                }else{
                    res.render('pages/add',{title:'Create a employee data',alert:'no'})
                }
            })
        }
    })

}

exports.employeeGetController = (req,res,next) => {
    Employee.findOne({_id:req.params.id}, (err, data) => {
        res.render('pages/details', {title:`Details about ${data.name}`,employee: data})
    })
}

exports.employeeUpdateGetController = (req,res,next) => {
    Employee.findOne({_id:req.params.id}, (err, data) => {
        res.render('pages/update', {title:`Update about ${data.name}`,employee: data})
    })
    
}

exports.employeeUpdatePostController = (req,res,next) => {
    const {name,section,designation,salary,nid,dob,phone,joining,gender,address,status} = req.body
    Employee.findOneAndUpdate({_id:req.params.id},{
        $set:{
            name:name,
            section:section,
            designation:designation,
            salary:salary,
            nid:nid,
            dob:dob,
            phone:phone,
            joining:joining,
            gender:gender,
            address:address,
            status:status
        }
    },(err)=>{
        if(err){
            Employee.find()
            res.render('pages/home',{title:'S&B all employee status',employees:data})
        }else{
            Employee.findOne({_id:req.params.id}, (err, data) => {
                res.render('pages/details', {title:`Details about ${data.name}`,employee: data})
            })
        }
    })
}

exports.employeeDeleteController = (req,res,next) => {
    
}

