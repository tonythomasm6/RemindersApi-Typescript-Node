import { Router } from 'express';
import {CreateReminderDto} from '../dtos/create-reminder';
import Reminder from '../models/reminder'
import {getDatabase} from '../dao/db'
import { ReminderService } from '../service/ReminderService';

const reminderService = new ReminderService();

const router = Router();
router.get('/', async (req, res) => {
        const reminders: Reminder[] = await reminderService.getAllReminders();
        res.status(200).json(reminders)
})


router.post('/', async (req, res) => {
    const {title} = req.body as CreateReminderDto;
    const reminder = await reminderService.addReminder(title);
    res.status(200).json(reminder)
})

router.delete("/:id", async (req, res) => {
        const result = await reminderService.deleteReminder(req.params.id);
        if (result && result?.changes === 0){
            return res.status(400).json({error : `Reminder not found for the id ${req.params.id}`})
        }
        res.status(204).send();
})

router.put("/:id", async (req, res) => {
        const result = await reminderService.updateReminder(req.params.id);
        if (result.changes === 0){
            return res.status(400).json({error : `Reminder not found for the id ${req.params.id}`})
        }
        const updatedReminder: Reminder = await reminderService.getReminder(req.params.id);
        res.status(202).json({'Updated record': updatedReminder});
})

export  default router;