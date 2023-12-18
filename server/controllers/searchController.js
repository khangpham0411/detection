const db = require("../config/database");

class searchController{
    search(req, res){
        const searchTerm = req.query.q;
        let q = `SELECT id, name, 'staff' as type FROM staffs WHERE name LIKE '%${searchTerm}%' UNION SELECT id, room_name, 'room' as type FROM rooms WHERE room_name LIKE '%${searchTerm}%' UNION  SELECT id, camera_name, 'camera' as type FROM cameras WHERE camera_name LIKE '%${searchTerm}%' limit 5`
        db.query(q, (err, result)=>{
            if (err) throw err;
            return res.status(200).json(result)
        })
    }
}

module.exports = new searchController();