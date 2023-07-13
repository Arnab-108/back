const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    if(token){
        try {
            const decoded = jwt.verify(token,"user")
            if(decoded){
                next()
            }
            else{
                res.send({"msg":"Please Login First!"})
            }
        } catch (error) {
            res.send({"err":error.message})
        }
    }
    else{
        res.send({"msg":"Please Login First!"})
    }
}


module.exports={auth}