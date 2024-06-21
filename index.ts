import express from 'express';
import router  from './routers/reminders'
const app = express();
app.use(express.json()) // To parse the request to json
app.use('/reminders', router)



app.get('/', (req, res) => {
    res.send("Hello world")
})


app.listen(8000, ()=> console.log('Server started +++'))