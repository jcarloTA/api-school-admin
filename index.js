const express = require('express')
const logger = require('./utils/logger')

const cors = require('cors')

const config = require('./config')

//libs npm
const bodyparser = require('body-parser')
const morgan = require('morgan')

//libs
const authJwt = require('./api/libs/auth')
const handleError = require('./api/libs/handleError')
//routes
const usersRoute = require('./api/resources/users/users.route')
const studentsRoute = require('./api/resources/student/student.route')
const teachersRoute = require('./api/resources/teacher/teacher.route')
const gradesRouter = require('./api/resources/grades/grades.rotue')
const assignsRouter = require('./api/resources/assigns/assigns.route')

//auth Strategy
const passport = require('passport')
passport.use(authJwt)

//Initial
const app = express();

app.use(bodyparser.json())
app.use(morgan('short', {
    stream: {
        write: message => logger.info(message.trim())
    }
}))


app.use(passport.initialize())

// app.use(cors({origin: '*'}));
app.use('/users',usersRoute)
app.use('/students', studentsRoute)
app.use('/teachers', teachersRoute)
app.use('/grades', gradesRouter)
app.use('/assigns', assignsRouter)


if(config.environment === 'prod') {
    app.use(handleError.errorsInProd)
} else {
    app.use(handleError.errorsInDev)
}

app.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    logger.info(JSON.stringify(req.user))
    res.send('Api already')
})

app.listen(config.host, () => {
    logger.info('Listening in port '+ config.host)
}) 
