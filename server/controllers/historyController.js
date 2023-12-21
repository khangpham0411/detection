const db = require("../config/database");
const {convertTotal, convertWorkingHours, mergeWorkingHours, convertAllWorkingHours, mergeAllWorkingHours, getDaysOff} = require("../services/historyService")

class historyController{
    showTotalWorkingHours(req, res){
        let { id, month, year } = req.body;
        month +=1;
        let q = `SELECT history_test.id, history_test.updated_at as time, history_test.status 
        FROM history_test, working_seats 
        WHERE history_test.seat_id=working_seats.id 
        AND working_seats.staff_id=${id}
        AND MONTH(history_test.updated_at)=${month} 
        AND YEAR(history_test.updated_at)=${year} 
        AND DAYOFWEEK(history_test.updated_at) NOT IN (1,7)
        ORDER BY history_test.updated_at`
        db.query(q, (err, result)=>{
            if (err) throw err;
            let convertedData = convertWorkingHours(result)
            let mergedData = mergeWorkingHours(convertedData)
            let finalData = convertTotal(mergedData)
            return res.status(200).json(finalData)
        })
    }

    showAllTotalWorkingHours(req, res){
        let { month, year } = req.body;
        month += 1;
        let q = `SELECT history_test.id, working_seats.staff_id, staffs.name, history_test.updated_at as time, history_test.status 
        FROM history_test, working_seats, staffs 
        WHERE history_test.seat_id=working_seats.id 
        AND working_seats.staff_id=staffs.id
        AND MONTH(history_test.updated_at)=${month} 
        AND YEAR(history_test.updated_at)=${year} 
        AND DAYOFWEEK(history_test.updated_at) NOT IN (1,7)
        ORDER BY working_seats.staff_id, history_test.updated_at`
        db.query(q, (err, result)=>{
            if (err) throw err;
            let convertedData = convertAllWorkingHours(result)
            let finalData = mergeAllWorkingHours(convertedData)
            return res.status(200).json(finalData)
        })
    }

    showDaysOff(req, res){
        let { id, month, year } = req.body;
        month +=1
        let q = `SELECT history_test.id, history_test.updated_at as time, history_test.status 
        FROM history_test, working_seats 
        WHERE history_test.seat_id=working_seats.id 
        AND working_seats.staff_id=${id}
        AND MONTH(history_test.updated_at)=${month} 
        AND YEAR(history_test.updated_at)=${year} 
        AND DAYOFWEEK(history_test.updated_at) NOT IN (1,7)
        ORDER BY history_test.updated_at`
        db.query(q, (err, result)=>{
            if (err) throw err;
            let convertedData = convertWorkingHours(result)
            let mergedData = mergeWorkingHours(convertedData)
            let finalData = getDaysOff(mergedData, year, month)
            return res.status(200).json(finalData)
        })
    }

}

module.exports = new historyController();