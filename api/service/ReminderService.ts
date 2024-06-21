import { error } from 'console';
import {ReminderDao} from '../dao/reminderDao'
import Reminder from '../models/reminder'

export class ReminderService {

    private reminderDao: ReminderDao;
    constructor(){
        this.reminderDao = new ReminderDao();
    }

    async getAllReminders() : Promise<Reminder[]>{
        return this.reminderDao.getAllReminders();
    }

    async getReminder(idInput:string): Promise<Reminder> {
        const id = this.formatInput(idInput);
        return this.reminderDao.getReminder(id);
    }

    async addReminder(title:string):Promise<Reminder> {
       return this.reminderDao.addReminder(title); 
    }

    async deleteReminder(idInput:string){
        const id = this.formatInput(idInput);
        return this.reminderDao.deleteReminder(id);
    }

    async updateReminder(idInput:string){
        const id = this.formatInput(idInput);
        return this.reminderDao.updateReminder(id);
    }

    formatInput(idInput: string) : number{
        if (idInput == ''){
            throw new Error('Id not provided for the operation')
        }
        const id = parseInt(idInput);
        if (!id || isNaN(id)) {
            console.error(`Invalid id provided :: ${id}  :: ${error} `);
            throw new Error(`Invalid id provided :: ${id}  :: ${error} `)
        } else {
            return id;
        }
    }

}