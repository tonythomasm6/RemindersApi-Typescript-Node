import { Router } from 'express';
import {CreateReminderDto} from '../dtos/create-reminder';
import Reminder from '../models/reminder'
import {getDatabase} from '../dao/db'

const router = Router();
router.get('/', async (req, res) => {
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
    const result = await db.run('INSERT INTO reminders (title,created_time, is_completed) VALUES (?,?,?)', reminder.title, reminder.createTime, reminder.isComplete);
    const newReminderId = result.lastID;

    const newReminder: Reminder = await db.all('SELECT * FROM reminders where id=?',newReminderId);

    res.status(201).json(newReminder)
})

router.delete("/:id", async (req, res) => {
    let id: number;
    if (req.params.id) {
        id = parseInt(req.params.id);
        if (isNaN(id)) {
            console.log("Invalid id input: " + req.params.id);
            return res.status(400).json({ error: 'Invalid id provided' });
        }
    } else {
        console.log("No id provided");
        return res.status(400).json({ error: 'No id provided' });
    }

    console.log(`Deleting reminder with id ${id}`)
    try{
        const db = getDatabase();
        const result = await db.run('DELETE FROM reminders WHERE id=?',id);
        if (result.changes === 0){
            return res.status(400).json({error : `Reminder not found for the id ${id}`})
        }else {
            res.status(204).send();
        }
    }catch(error){
        console.error('Exception in deleting reminder')
        res.status(500).json({error:'Failed to delete reminder'})
    }
})

router.put("/:id", async (req, res) => {
    let id: number;
    if (req.params.id) {
        id = parseInt(req.params.id);
        if (isNaN(id)) {
            console.log("Invalid id input: " + req.params.id);
            return res.status(400).json({ error: 'Invalid id provided' });
        }
    } else {
        console.log("No id provided");
        return res.status(400).json({ error: 'No id provided' });
    }

    console.log(`Updating reminder with id ${id}`)
    try{
        const db = getDatabase();
        const result = await db.run('UPDATE reminders SET is_completed =1 WHERE id=?',id);
        if (result.changes === 0){
            return res.status(400).json({error : `Reminder not found for the id ${id}`})
        }else {
            const updatedReminder: Reminder = await db.all('SELECT * FROM reminders where id=?',id);
            res.status(202).json({'Updated record': updatedReminder});
        }
    }catch(error){
        console.error('Exception in updating reminder '+error)
        res.status(500).json({error:'Failed to delete reminder'})
    }
})

export  default router;