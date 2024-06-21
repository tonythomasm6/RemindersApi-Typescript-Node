export default class Reminder {
    id: number;
    createTime: string;
    isComplete: boolean;

    constructor(public title: string){
        this.id = 0;
        this.createTime = this.getCurrentTime();
        this.isComplete = false;
    

        }

        getCurrentTime():string{
            const now = new Date();

            // Get date components
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so we add 1
            const day = String(now.getDate()).padStart(2, '0');

            // Get time components
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            // Construct the date-time string
            const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            return dateTimeString;
        }
    }
