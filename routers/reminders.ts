import { Router } from 'express';
import {CreateReminderDto} from '../dtos/create-reminder';
import Reminder from '../models/reminder'
import {getDatabase} from '../database/db'

const router = Router();
router.get('/', async (req, res) => {
    console.log('In get method')
    try {
            const db = getDatabase();
            const reminders : Reminder[] = await db.all('SELECT * FROM reminders');
            res.status(201).json(reminders)
    }catch(error){
        console.error('Error in getting reminders')
    }
})



router.post('/', async (req, res) => {
    const {title} = req.body as CreateReminderDto;
    const reminder = new Reminder(title);
    const db = getDatabase();
    const result = await db.run('INSERT INTO reminders (title, isCompleted) VALUES (?,?)', reminder.title, reminder.isComplete);
    const newReminderId = result.lastID;

    const newReminder: Reminder = await db.all('SELECT * FROM reminders where id=?',newReminderId);

    res.status(201).json(newReminder)
})

export  default router;