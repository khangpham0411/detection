const db = require("../config/database");

class cameraController{
    showAllCameras(req, res){
        let q = 'SELECT cameras.id, camera_name, camera_url, description, rooms.room_name, cameras.status, cameras.updated_at FROM cameras, rooms WHERE cameras.room_id=rooms.id'
        db.query(q , (err, result)=>{
            if (err) throw err;
            return res.status(200).json(result)
        })
    }

    showSingleCamera(req, res){
        let q = `SELECT cameras.id, camera_name, camera_url, description, width, height, cameras.status, cameras.room_id, rooms.room_name FROM cameras, rooms WHERE cameras.room_id=rooms.id AND cameras.id=${req.params.id}`
        db.query(q, (err, result)=>{
            if (err) throw err;
            if (result.length > 0){
                return res.status(200).json(result[0])
            } else {
                return res.status(404).json({error: "Camera not found"})
            }
        })
    }

    countCamera(req, res){
        let q = `SELECT count(*) as count FROM cameras`
        db.query(q, (err, result)=>{
            if (err) throw err;
            return res.status(200).json(result[0])
        })
    }


    getAllCameraNames(req, res){
        let q = 'SELECT id,camera_name FROM cameras WHERE status="Active"'
        db.query(q, (err, result)=>{
            if (err) throw err;
            if (result.length>0){
                return res.status(200).json(result)
            } else {
                return res.status(404).json({error: "Not Found"})
            }
        })
    }

    getRoomFromCamera(req, res){
        let q = `SELECT rooms.id, rooms.room_name FROM cameras, rooms WHERE cameras.room_id = rooms.id AND cameras.id=${req.params.id}`
        db.query(q, (err, result)=>{
            if (err) throw err;
            return res.status(200).json(result[0])
        })
    }


    getCameraUrl(req, res){
        let q = `SELECT camera_url FROM cameras WHERE id = ${req.params.id}`
        db.query(q, (err, result)=>{
            if (err) throw err;
            return res.status(200).json(result[0])
        })
    }


    getCameraFromStaff(req, res){
        let q= `SELECT cameras.id, cameras.camera_name, cameras.camera_url, cameras.width, cameras.height FROM cameras, staffs, working_seats WHERE cameras.id=working_seats.camera_id AND working_seats.staff_id = staffs.id AND staffs.id=${req.params.id}`
        db.query(q, (err, result)=>{
            if (err) throw err;
            return res.status(200).json(result[0])
        })
    }

    addCamera(req, res){
        const { camera_name, camera_url, description, width, height, room_id } = req.body;
        let q = `INSERT INTO cameras SET ?`;
        const user_id = 1;
        db.query(q, { camera_name, camera_url, description, width, height, room_id, user_id }, (err, result)=>{
            if (err) throw err;
            return res.status(201).json({message:"Create successfully"})
        })
    }

    updateCamera(req, res){
        const { camera_name, camera_url, description, width, height, status, room_id } = req.body;
        let q = `UPDATE cameras SET ? WHERE id = ${req.params.id}`
        db.query(q, {camera_name, camera_url, description, width, height, status, room_id}, (err, result)=>{
            if (err) throw err;
            return res.status(200).json({message:"Update successfully"})
        })
    }

    deleteCamera(req, res){
        let q = `DELETE FROM cameras WHERE id = ${req.params.id}`
        db.query(q, (err, results)=>{
            if (err) throw err;
            let q1 = `SELECT id FROM working_seats WHERE camera_id=${req.params.id}`
            db.query(q1, (err, result)=>{
                if (err) throw err;
                if (result.length>0) {
                    let q2 = `DELETE FROM working_seats WHERE camera_id=${req.params.id}`
                    if (err) throw err;
                    return res.status(204).json({message:"Delete successfully"})
                }else{
                    return res.status(204).json({message:"Delete successfully"})
                }
            })
        })
    }
    
}

module.exports = new cameraController();