const jwt = require("jsonwebtoken")
require('dotenv').config()

const createJWT = (userid, email) => {
    let key = process.env.KEY;
    let token = null;
    const payload={
        id : userid,
        email : email
    }
    try {
        token = jwt.sign(payload, key, {expiresIn:"7d"})
    } catch (error){
        console.log(error)
    }
    return token
}

const createRefreshJWT =(userid, email) => {
    let key = process.env.REFRESHKEY;
    let refreshtoken = null;
    const payload={
        id : userid,
        email : email
    }
    try {
        refreshtoken = jwt.sign(payload, key, {expiresIn:"99d"});
    } catch (error) {
        console.log(error)
    }
    return refreshtoken
}

const checkUserJWT = (req, res, next) => {
    const token = req.headers.token;
    let key = process.env.KEY;
    if (token){
        //Bearer *****
        accessToken = token.split(" ")[1];
        jwt.verify(accessToken, key,(err, user) =>{
            if (err){
                if (err.name === 'TokenExpiredError'){
                    return res.status(401).json("Token Expired")
                }else{
                    return res.status(403).json("Token invalid")
                }
            }
            req.user = user;
            next();
        })
    } else {
        return res.status(401).json({message : "You are not authenticated"});
    }
}

module.exports = {createJWT, createRefreshJWT, checkUserJWT}