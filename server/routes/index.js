const cameraRouter = require('./cameraRouter')
const roomRouter = require('./roomRouter')
const staffRouter = require('./staffRouter')
const historyRouter = require('./historyRouter')
const seatRouter = require('./seatRouter')
const searchRouter = require('./searchRouter')
const authRouter = require('./authRouter')
const userRouter = require('./userRouter')

function route(app){
    app.use('/api/staffs', staffRouter)
    app.use('/api/rooms', roomRouter)
    app.use('/api/cameras', cameraRouter)
    app.use('/api/seats', seatRouter)
    app.use('/api/history', historyRouter)
    app.use('/api/search', searchRouter)
    app.use('/api/auth', authRouter)
    app.use('/api/users', userRouter)
}
module.exports = route;