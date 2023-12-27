const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createJWT, createRefreshJWT } =require('../middleware/authMiddleware')
const nodemailer = require("nodemailer")
const crypto = require("crypto")
require('dotenv').config()

class authController{
    login(req, res){
        const { email, password } = req.body;
        const q = `SELECT id, email, username, password FROM users WHERE email = "${email}"`;
        db.query(q, async(err, result)=>{
            if (err) throw err;
            if (result.length<=0) {
                return res.status(401).json({error: "Wrong email"});
            }
            let user = result[0];
            const validation = await bcrypt.compare(password, user.password);
            if (!validation){
                return res.status(401).json({error : "Wrong password"});
            } else {
                const token = createJWT(user.id, user.email);
                const reToken = createRefreshJWT(user.id, user.email);
                const user_id = user.id;
                const { password, ...userWithoutPassword } = user;
                user = userWithoutPassword;
                db.query(`DELETE FROM refresh_tokens WHERE user_id="${user_id}"`, (err, result)=>{
                    if (err) throw err;
                    db.query(`INSERT INTO refresh_tokens (user_id, expired_at, re_token) VALUES (${user_id}, NOW() + INTERVAL 99 DAY, '${reToken}')`, (err, result)=>{
                        if (err) throw err;
                        res.cookie("refreshToken", reToken, {
                            httpOnly : true,
                            secure : false, //để false trong quá trình code, khi deploy đổi thành true
                            sameSite : "strict"})
                        return res.status(200).json({user , token});
                    })
                })
            }
        })
    }

    register = async(req,res)=>{
            let { username, full_name, email, phone, password } = req.body;
            let q = `INSERT INTO users SET ?`;
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);

            db.query(q, {user, email, full_name, phone, password}, (err, result)=>{
                if (err) throw err;
                return res.status(200).json(result);
            })
    }

    requestRefreshToken = async(req, res) =>{
        //Take refresh token from user
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json("You're not authenticated")
        db.query(`Select * from refresh_tokens where re_token="${refreshToken}"`,(err,result)=>{
            if (err) throw err;
            if (!result){return res.status(403).json("Refresh token is not valid")}
            jwt.verify(refreshToken, process.env.REFRESHKEY, (err,payload)=>{
                if (err) throw err;
                db.query(`DELETE FROM refresh_tokens WHERE reToken="${refreshToken}"`)
                //create new accesstoken, refresh token
                const newAccessToken = createJWT(payload.id, payload.email)
                const reToken = createRefreshJWT(payload.id, payload.email)
                db.query("INSERT INTO refreshtoken (user_id) ",{reToken}, (err, result)=>{
                    res.cookie("refreshToken", reToken, {
                        httpOnly : true,
                        secure : false, //để false trong quá trình code, khi deploy đổi thành true
                        sameSite : "strict"})
                    return res.status(200).json({access_token : newAccessToken})
                })
                
            })
        })
    }

    sendmail = async(req, res)=>{
        const { email, username} = req.body;
        const emailToken = crypto.randomBytes(16).toString('hex')
        var transporter = nodemailer.createTransport({
            service : 'Gmail',
            auth : {
                user : process.env.EMAIL,
                pass : process.env.PASSEMAIL,
            }
        })
        var mailOptions = {
            from : process.env.EMAIL,
            to : req.body.email,
            subject : 'Email Verification',
            text : `Hi ${username}. \nPlease follow the given link to verify your email`,
            html: `<a href="http://localhost:3000/verify/token=${emailToken}">Veify</a>`
        }
    }

    changePassword = async(req, res)=>{
        let {password} = req.body;
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        let q = `UPDATE users SET ? WHERE id=1`
        db.query(q, {password}, (err, result)=>{
            if (err) throw err;
            return res.status(200).json(result)
        })
    }
}
module.exports = new authController();

