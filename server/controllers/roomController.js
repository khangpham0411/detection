const db = require("../config/database");

class roomController{
    showAllRooms(req, res){
        let q = 'SELECT id, room_name, floor, location, updated_at FROM rooms';
        db.query(q , (err, result)=>{
            if (err) throw err;
            return res.status(200).json(result);
        })
    }

    showSingleRoom(req, res){
        let q = `SELECT id, room_name, floor, location FROM rooms WHERE id=${req.params.id}`;
        db.query(q, (err, result)=>{
            if (err) throw err;
            return res.status(200).json(result[0])
        })
    }

    countRoom(req, res){
        let q = `SELECT count(*) as count FROM rooms WHERE user_id=${req.params.id}`
        db.query(q, (err, result)=>{
            if (err) throw err;
            return res.status(200).json(result[0])
        })
    }

    getStaffs(req, res){
        let q = `SELECT staffs.id, staffs.name, staffs.email, staffs.phone, staffs.updated_at 
            FROM staffs, rooms, working_seats, cameras 
            WHERE staffs.id=working_seats.staff_id 
            AND working_seats.camera_id=cameras.id 
            AND cameras.room_id=rooms.id 
            AND rooms.id=${req.params.id}`
        db.query(q, (err, result)=>{
            if (err) throw err;
            return res.status(200).json(result)
        })
    }

    addRoom(req, res){
        const { room_name, location, floor} = req.body;
        let q = 'INSERT INTO rooms SET ?';
        const user_id=1;
        db.query(q, {room_name, location, floor, user_id }, (err, result)=>{
            if (err) throw err;
            return res.status(201).json({message:"Create successfully"})
        })
    }

    getRoomName(req, res){
        let q = `SELECT id, room_name FROM rooms WHERE user_id=${req.params.user_id}`
        db.query(q, (err, result)=>{
            if (err) throw err;
            return res.status(200).json(result)
        })
    }

    updateRoom(req, res){
        const { room_name, location, floor} = req.body;
        let q = `UPDATE rooms SET ? WHERE id=${req.params.id}`;
        db.query(q, { room_name, location, floor }, (err, result)=>{
            if (err) throw err;
            return res.status(200).json({message:"Update successfully"});
        })
    }

    deleteRoom(req, res){
        let q = `DELETE FROM rooms WHERE id=${req.params.id}`;
        db.query(q, (err, result)=>{
            if (err) throw err;
            return res.status(204).json({message:"Delete successfully"})
        })
    }
}

module.exports = new roomController();