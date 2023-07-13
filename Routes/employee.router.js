const express = require("express")
const {employeeModel} = require("../Model/employee.model")
const {auth} = require("../Middleware/auth.middleware")
const employeeRouter = express.Router()

employeeRouter.use(auth)

employeeRouter.get("/",async(req,res)=>{
    const {department,orderBy} = req.query
    const query={}
    if(department){
        query.department={$in:department}
    }

    let sortObj={}
    if(orderBy==="asc"){
        sortObj.salary=1
    }
    else if(orderBy==="desc"){
        sortObj.salary=-1
    }
    try {
        const data = await employeeModel.find(query).sort(sortObj)
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({"err":error})
    }
})


employeeRouter.get("/:id",async(req,res)=>{
    const {id} = req.params
    try {
        const data = await employeeModel.find({_id:id})
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({"err":error})
    }
})

employeeRouter.post("/add",async(req,res)=>{
    try {
        const data = employeeModel(req.body)
        await data.save()
        res.status(200).send({"msg":"New user added!" , "user":req.body})
    } catch (error) {
        res.status(400).send({"err":error})
    }
})

employeeRouter.patch("/:id",async(req,res)=>{
    const {id} = req.params
    console.log(id)
    try {
        await employeeModel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).send(`Employee with ${id} has been updated!`)
    } catch (error) {
        res.status(400).send(error)
    }
})


employeeRouter.delete("/:id",async(req,res)=>{
    const {id} = req.params
    console.log(id)
    try {
        await employeeModel.findByIdAndDelete({_id:id},req.body)
        res.status(200).send(`Employee with ${id} has been removed!`)
    } catch (error) {
        res.status(400).send(error)
    }
})
module.exports={employeeRouter}