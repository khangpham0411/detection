const db = require("../config/database");

class staffController{
    showAllStaffs(req, res){
        let q = "SELECT id, name, email, phone, updated_at FROM staffs";
        db.query(q, (err, result)=>{
            if (err) throw err;
            return res.status(200).json(result)
        })
    }

    countStaff(req, res){
        let q = `SELECT count(*) as count FROM staffs`
        db.query(q, (err,result)=>{
            if (err) throw err;
            return res.status(200).json(result[0])
        })
    }

    getStaffFromCamera(req,res){
        let q = `SELECT staffs.id, staffs.name, staffs.email, x, y, w, h FROM cameras, staffs, working_seats WHERE cameras.id=working_seats.camera_id AND working_seats.staff_id=staffs.id AND cameras.id=${req.params.id}`;
        db.query(q, (err,result)=>{
            if (err) throw err;
            return res.status(200).json(result)
        })
    }

    checkEmail(req, res){
        const { email } = req.body;
        let q = `SELECT count(*) as count FROM staffs WHERE ?`;
        db.query(q, {email}, (err, result)=>{
            if (err) throw err;
            if (result[0].count>0){
                return res.status(200).json({message:"Email exists in database"})
            } else {
                return res.status(200).json({message:"Email does not exist in database"})
            }
        })
    }

    addStaff(req, res){
        const { name, full_name, email, phone, camera_id, x, y, w, h} = req.body;
        const user_id = 1
        let q = "INSERT INTO staffs SET ?"
        db.query(q, {name, full_name, email, phone, user_id}, (err, result)=>{
            if (err) throw err;
            const staff_id = result.insertId;
            let q1 = "INSERT INTO  working_seats SET ?";
            db.query(q1, {staff_id, camera_id, x, y, w, h, user_id}, (err, result)=>{
                if (err) throw err;
                return res.status(201).json({message:"Create successfully"})
            })
        })
    }


    showSingleStaff(req, res){
        let q = `SELECT id, name, email, full_name, phone, updated_at FROM staffs WHERE id = ${req.params.id}`;
        db.query(q, (err, result)=>{
            if (err) throw err;
            return res.status(200).json(result[0])
        })
    }


    updateStaffInfo(req, res){
        const { name, email, full_name, phone } = req.body;
        let q = `UPDATE staffs SET ? WHERE id =${req.params.id}`
        db.query(q,{name, email, full_name, phone}, (err, result)=>{
            if (err) throw err;
            return res.status(200).json({message:"Update successfully"})
        })
    }

    deleteStaff(req, res){
        let q = `DELETE FROM working_seats WHERE staff_id=${req.params.id}`
        db.query(q,(err,result)=>{
            if (err) throw err;
            let q1 = `DELETE FROM staffs WHERE id=${req.params.id}`
            db.query(q1, (err, result)=>{
                if (err) throw err;
                return res.status(204).json({message:"Delete successfully"})
            })
        })
    }
}

module.exports = new staffController()