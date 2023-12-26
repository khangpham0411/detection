const db = require("../config/database");

class userController{
    showSingleUser(req, res){
        let q = `SELECT username, full_name, email, phone, date_of_birth, gender, address FROM users WHERE id=${req.params.id}`
        db.query(q, (err, result)=>{
            if (err) throw err;
            return res.status(200).json(result[0])
        })
    }

    updateInfoUser(req, res){
        const { username, full_name, address, phone, date_of_birth, gender } = req.body;
        let q = `UPDATE users SET ? WHERE id = ${req.params.id}`
        db.query(q, { username, full_name, address, phone, date_of_birth, gender}, (err, result)=>{
            if (err) throw err;
            return res.status(200).json({message:"Update successfully"})
        })
    }
}

module.exports = new userController()