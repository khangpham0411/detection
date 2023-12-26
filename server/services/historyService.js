function convertWorkingHours(data){
    const convertedData = [];
    let currentTask = null;
    for (let i=0; i < data.length; i++){
        const currentItem = data[i];
        if (currentItem.status === 1 && currentItem !== data[data.length-1]){
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
        }else if (currentItem.status === 1 && currentItem===data[data.length-1]){
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
            const currentDate = new Date()
            const timeDiff = Math.abs(currentDate - currentTask.startTime)
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
            const time = `${hours}h ${minutes}m ${seconds}s`
            currentTask = { id: currentItem.id, date:date, startTime:dateObject, endTime:currentDate, workingHours:time, timeDiff:timeDiff}
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

function convertAverage(data){
    let convertedData = data
    let total = 0
    convertedData.forEach((item)=>{
        total+=item.timeDiff
    })
    let avg = total/(convertedData.length)
    const hours = Math.floor(avg / (1000 * 60 * 60));
    const minutes = Math.floor((avg % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((avg % (1000 * 60)) / 1000);
    const time = `${hours}h ${minutes}m ${seconds}s`
    convertedData.push({id:"avg" ,date:"AVERAGE", workingHours: time, timeDiff:total})
    return convertedData
}

function convertAllWorkingHours(data){
    const convertedData = [];
    let currentTask = null;
    for (let i=0; i < data.length; i++){
        const currentItem = data[i];
        if (currentItem.status === 1 && currentItem!==data[data.length-1]){
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
            currentTask = { id: currentItem.id, staff: currentItem.staff_id, name:currentItem.name, date:date, startTime:dateObject, endTime:null, workingHours:null, timeDiff:null}
        }else if (currentItem.status === 1 && currentItem===data[data.length-1]){
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
            const currentDate = new Date()
            const timeDiff = Math.abs(currentDate - currentTask.startTime)
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
            const time = `${hours}h ${minutes}m ${seconds}s`
            currentTask = { id: currentItem.id, staff: currentItem.staff_id, name:currentItem.name, date:date, startTime:dateObject, endTime:currentDate, workingHours:time, timeDiff:timeDiff}
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

function mergeAllWorkingHours(data){
    const result=[]
    if (data){
        data.map(item=>{
            if (result.length===0){
                const temp = { id: item.id, staff: item.staff, name: item.name,time: item.timeDiff, workingHours: item.workingHours }
                result.push(temp)
            }else{
                if(result[result.length-1].staff===item.staff){
                    result[result.length-1].time+=item.timeDiff
                    const hours = Math.floor(result[result.length-1].time / (1000 * 60 * 60));
                    const minutes = Math.floor((result[result.length-1].time % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((result[result.length-1].time % (1000 * 60)) / 1000);
                    const time = `${hours}h ${minutes}m ${seconds}s`
                    result[result.length-1].workingHours = time
                }else{
                    const temp = { id: item.id, staff: item.staff, name: item.name,time: item.timeDiff, workingHours: item.workingHours }
                    result.push(temp)
                }
            }
        })
    }
    for (let i=0; i < result.length; i++){
        const currentItem = result[i];
        let time = currentItem.time;
        time=time / (1000 * 60 * 60);
        time = time.toFixed(2)
        time = parseFloat(time)
        result[i].time=time
    }

    const sortResult = result.sort((a,b)=>b.time-a.time)
    return sortResult
}

function getDaysOff(data, year, month){
    let daysInMonth = null
    const currentDate = new Date()
    if ((month === (currentDate.getMonth()+1))&&( year === (currentDate.getFullYear()))) {
        daysInMonth=currentDate.getDate()
    } else{
        daysInMonth = new Date(year, month, 0).getDate()
    }
    const daysArray = []

    for (let day = 1; day<=daysInMonth; day++){
        const dateObject = new Date(year,month-1,day);
        // Lấy thứ của ngày hiện tại
        const dayOfWeek = dateObject.getDay();
        if (dayOfWeek!==0 & dayOfWeek!==6){
            // Biến đổi số thứ thành tên thứ
            const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
            const dayName = daysOfWeek[dayOfWeek];
            const day = dateObject.getDate();
            const date = `${dayName} ${day}-${month}-${year}`
            daysArray.push(date)
        }
    }
    const daysOff = daysArray.filter(day => !(data.some(item => item.date===day)))
    return daysOff
}

module.exports = {convertWorkingHours, mergeWorkingHours, convertTotal, convertAverage, convertAllWorkingHours, mergeAllWorkingHours, getDaysOff}