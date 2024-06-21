import express from 'express';
import router  from './routers/routers'
import {initializeDatabase} from './dao/db'

const app = express();
app.use(express.json()) // To parse the request to json
app.use('/reminders', router)

app.get('/', (req, res) => {
    res.send("Hello world")
})


// app.listen(8000, ()=> console.log('Server started +++'))

initializeDatabase()
   .then(() => app.listen(8000, ()=> console.log('Server started +++')))
   .catch((error)=> console.error("Server failed to error due to database initialization fail"))


