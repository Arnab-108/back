const express = require("express")
const cors = require("cors")
const {connection} = require("./db")
const {userRouter} = require("./Routes/user.router")
const { employeeRouter } = require("./Routes/employee.router")
const app = express()

app.use(express.json())
app.use(cors())


app.get("/",(req,res)=>{
    res.send("Homepage")
})

app.use("/user",userRouter)
app.use("/employees",employeeRouter)
app.listen(8080,async()=>{
    try {
        await connection
        console.log("Connected to DB!")
        console.log("Server is running at 8080")
    } catch (error) {
        console.log(error)
        console.log("Something went wrong!")
    }
    
})