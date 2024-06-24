import { Routes } from '@angular/router';
import { ReminderComponent } from '../reminder/reminder.component';
import { AboutComponent } from '../about/about.component'
export const routes: Routes = [
    {
        path: '',
        component: ReminderComponent
    },
    {
        path: 'about',
        component: AboutComponent
    }
];
