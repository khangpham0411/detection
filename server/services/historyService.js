function convertWorkingHours(data){
    const convertedData = [];
    let currentTask = null;
    for (let i=0; i < data.length; i++){
        const currentItem = data[i];
        if (currentItem.status === 1){
            let dateObject = new Date(currentItem.time);
            // Lấy thứ của ngày hiện tại
            const dayOfWeek = dateObject.getDay();
            // Biến đổi số thứ thành tên thứ
            const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
            const dayName = daysOfWeek[dayOfWeek];
            const year = dateObject.getFullYear();
            const month = dateObject.getMonth(); // Tháng bắt đầu từ 0, cộng thêm 1
            const day = dateObject.getDate();
            const date = `${dayName} ${day}-${month+1}-${year}`
            currentTask = { id: currentItem.id, date:date, startTime:dateObject, endTime:null, workingHours:null, timeDiff:null}
        }else if (currentItem.status===0 && currentTask){ 
            let dateObject = new Date(currentItem.time);
            currentTask.endTime = dateObject;
            currentTask.timeDiff = Math.abs(currentTask.endTime - currentTask.startTime)
            const hours = Math.floor(currentTask.timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((currentTask.timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((currentTask.timeDiff % (1000 * 60)) / 1000);
            const time = `${hours}h ${minutes}m ${seconds}s`
            currentTask.workingHours=time
            convertedData.push(currentTask);
            currentTask=null;
        }
    }
    return convertedData
}

function mergeWorkingHours(data){
    const result=[]
    if (data){
        data.map(item=>{
            if (result.length===0){
                result.push(item)
            }else{
                if(result[result.length-1].date===item.date){
                    result[result.length-1].timeDiff+=item.timeDiff
                    const hours = Math.floor(result[result.length-1].timeDiff / (1000 * 60 * 60));
                    const minutes = Math.floor((result[result.length-1].timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((result[result.length-1].timeDiff % (1000 * 60)) / 1000);
                    const time = `${hours}h ${minutes}m ${seconds}s`
                    result[result.length-1].workingHours = time
                }else{
                    result.push(item)
                }
            }
        })
    }
    return result
}

function convertTotal(data){
    let convertedData = data
    let total = 0
    convertedData.forEach((item)=>{
        total+=item.timeDiff
    })
    const hours = Math.floor(total / (1000 * 60 * 60));
    const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((total % (1000 * 60)) / 1000);
    const time = `${hours}h ${minutes}m ${seconds}s`
    convertedData.push({id:"total" ,date:"TOTAL", workingHours: time, timeDiff:total})
    return convertedData
}

module.exports = {convertWorkingHours, mergeWorkingHours, convertTotal}