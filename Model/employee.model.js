const mongoose = require("mongoose")

const employeeSchema = mongoose.Schema({
    f_name:{type:String,required:true},
    l_name:{type:String,required:true},
    email:{type:String,required:true},
    department:{type:String,required:true},
    salary:{type:Number,required:true}
},{
    versionKey:false
})

const employeeModel = mongoose.model("employee",employeeSchema)

module.exports={employeeModel}