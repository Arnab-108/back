const express = require("express")
const {userModel} = require("../Model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userRouter = express.Router()

userRouter.post("/signup",async(req,res)=>{
    const {email,password,confirm_password}=req.body
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            const data = userModel({email,password:hash,confirm_password:hash})
            await data.save()
            res.status(200).send({"msg":"New User Added!" , "user":req.body})
        })
    } catch (error) {
        res.status(400).send({"err":error})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await userModel.findOne({email})
        console.log(user)
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token = jwt.sign({userID:user._id} , "user",{
                        expiresIn:"7d"
                    })
                    res.status(200).send({"msg":"Login Successfull!" , token:token})
                }
                else{
                    res.status(400).send({"err":"Invalid user details"})
                }
            })
        }
        else{
            res.status(400).send({"err":"Please enter correct details!"})
        }
    } catch (error) {
        res.status(400).send(error)
    }
})



module.exports = {userRouter}