const db = require("../config/database");

class seatController{
    getSeatFromStaff(req, res){
        let q = `SELECT staffs.id, staffs.name, x, y, w, h FROM staffs, working_seats WHERE staffs.id=working_seats.staff_id AND staffs.id=${req.params.id}`
        db.query(q, (err, result)=>{
            if (err) throw err;
            return res.status(200).json(result)
        })
    }

    updateSeatStaff(req, res){
        const { newCamera_id, x, y, w, h } = req.body;
        const camera_id = newCamera_id
        let q = `UPDATE working_seats SET ? WHERE staff_id=${req.params.id}`;
        db.query(q, {camera_id, x, y, w, h}, (err, result)=>{
            if (err) throw err;
            return res.status(200).json("Update successfully");
        })
    }

    updateSeatCamera(req, res){
        const { staffId, cameraId, staff_x, staff_y, staff_w, staff_h } = req.body;
        const x = staff_x;
        const y = staff_y;
        const w = staff_w;
        const h = staff_h;
        let q = `UPDATE working_seats SET ? WHERE camera_id=${cameraId} AND staff_id=${staffId}`;
        db.query(q, {x, y, w, h}, (err, result)=>{
            if (err) throw err;
            return res.status(200).json("Update successfully");
        })
    }
}

module.exports = new seatController();