import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reminder } from '../model/reminder';
import { ApiService } from '../service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reminder',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './reminder.component.html',
  styleUrl: './reminder.component.css',
  providers: [ApiService]
})
export class ReminderComponent  implements OnInit{
    
  constructor(private apiService: ApiService, private router: Router){

  }

  reminders: Reminder[] = [];
  newTitle: string ='';

  ngOnInit(): void {
      this.loadAllReminders();
  }

  navigateToAbout(): void {
    this.router.navigateByUrl('/about')
  }

  loadAllReminders(): void{
    this.apiService.getAllReminders().subscribe(reminders => {
      this.reminders = reminders
    },
   error => console.error("Error in loading reminders")
  );
  }

  deleteReminder(id: number) : void{
    this.apiService.deleteReminder(id).subscribe(
      () => {
        this.reminders = this.reminders.filter(r => r.id != id);
      },
      error => console.error("Error deleting id")
    )
  }

  updateReminderStatus(reminder: Reminder) {
    this.apiService.updateReminderStatus(reminder.id, reminder.isComplete).subscribe(
      // updatedReminder => {
      //   alert(updatedReminder.isComplete)
      //   const index = this.reminders.findIndex(r => r.id === updatedReminder.id);
      //   if (index !== -1) {
      //     this.reminders[index] = updatedReminder;
      //   }
      // },
      () => {
        this.loadAllReminders();
      },
      error => console.error('Error updating reminder', error)
    );
  }

  addReminder() {
    if (this.newTitle.trim()) {
      this.apiService.addReminder(this.newTitle.trim()).subscribe(
        // reminder => {
        //   this.reminders.push(reminder);
        //   this.newTitle = '';
        // },
        () => {
          this.loadAllReminders()
          this.newTitle = '';
        },
        error => console.error('Error adding reminder', error)
      );
    }
  }

}
