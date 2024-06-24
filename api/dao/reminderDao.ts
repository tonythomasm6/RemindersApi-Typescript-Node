
import {getDatabase} from '../dao/db'
import Reminder from '../models/reminder'
export class ReminderDao{

    async getAllReminders(): Promise<Reminder[]> {
        try {
                const db = getDatabase();
                const remindersFromDb = await db.all('SELECT * FROM reminders');
                const reminders: Reminder[] = remindersFromDb.map(row => ({
                    id: row.id,
                    createTime: row.created_time,
                    isComplete: row.is_completed === 1, // Convert SQLite BOOLEAN (0/1) to boolean
                    title: row.title
                  }))
                return reminders;
        }catch(error){
            console.error('Error in getting reminders')
            throw new Error('Error in getting Reminders')
        }
    }

    async getReminder(id:number): Promise<Reminder> {
        try {
                const db = getDatabase();
                const reminder : Reminder = await db.all('SELECT * FROM reminders WHERE id=?',id);
                return reminder;
        }catch(error){
            console.error('Error in getting reminders')
            throw new Error('Error in getting Reminders')
        }
    }


    async addReminder(title: string, createdTime: string): Promise<Reminder> {
        try{
            const reminder = new Reminder(title, createdTime);
            const db = getDatabase();
            const result = await db.run('INSERT INTO reminders (title,created_time, is_completed) VALUES (?,?,?)', reminder.title, reminder.createTime, reminder.isComplete);
            const newReminder: Reminder = await db.all('SELECT * FROM reminders where id=?',result.lastID);
            return newReminder;
        }
        catch(error){
            console.error('Error in adding new reminder '+error)
            throw new Error('Error in getting Reminders')
        }
    }

    async deleteReminder(id:number) {
        const db = getDatabase();
        const result = await db.run('DELETE FROM reminders WHERE id=?',id);
        return result;
    }
    
    async updateReminder(id: number, isComplete: number){
        const db = getDatabase();
        const result = await db.run('UPDATE reminders SET is_completed =? WHERE id=?',isComplete,id);
        return result;
    }

}