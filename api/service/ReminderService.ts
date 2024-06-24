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
       return this.reminderDao.addReminder(title, this.getCurrentTime()); 
    }

    async deleteReminder(idInput:string){
        const id = this.formatInput(idInput);
        return this.reminderDao.deleteReminder(id);
    }

    async updateReminder(idInput:string, isComplete: string){
        const id = this.formatInput(idInput);
        return this.reminderDao.updateReminder(id, this.getCompleteStatus(isComplete));
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

    getCompleteStatus(input: string) : number {
        return input.toLowerCase() === 'true' ? 1 : 0;
    }

    getCurrentTime(): string {
        const now = new Date();
    
        // Get date components
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so we add 1
        const day = String(now.getDate()).padStart(2, '0');
    
        // Get time components
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
    
        // Convert hours from 24-hour to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'
        const hoursStr = String(hours).padStart(2, '0');
    
        // Construct the date-time string
        const dateTimeString = `${year}-${month}-${day} ${hoursStr}:${minutes}:${seconds} ${ampm}`;
        return dateTimeString;
    }
    
}
