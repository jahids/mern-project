const UserModel = require('../Models/UserModel')
const jwt = require('jsonwebtoken');

module.exports.checkuser = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,"secret key", (err, decodedToken)=>{
        if(err){
            res.json({status : false})
            next();
        }else{
            // const User = UserModel.findById(decodedToken.id);
            // console.log(User);
            const User = UserModel.findById(decodedToken.id,(error,data)=>{
                if(error){
                    console.log(error, 'jwt test eror')
                }else{
                    console.log(User, "jwt user test")
                    console.log(data, "jahid")

                    res.json({status : true, role: data.role, user: data.email})
                    
                    console.log(data.email)

                }
            })

            // if(jahidtm){
            //     res.json({status : true, user: jahidtm.data.email})
            //     console.log(jahidtm.data.email, 'tdslfja')
            // }else{
            //     res.json({status : false})
            //     next();
            // }
             
        }
        })
    }else{
        res.json({status : false})
        next();
    }
}