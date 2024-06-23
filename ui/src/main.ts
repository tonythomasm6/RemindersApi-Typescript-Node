import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { ReminderComponent } from './reminder/reminder.component';

bootstrapApplication(ReminderComponent, appConfig)
  .catch((err) => console.error(err));
