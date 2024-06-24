import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reminder } from '../model/reminder';
import { environment } from '../environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  getAllReminders():Observable<Reminder[]>{
    return this.http.get<Reminder[]>(this.apiUrl);
  }

  addReminder(title: string): Observable<Reminder>{
    return this.http.post<Reminder>(this.apiUrl, {"title": title});
  }

  updateReminderStatus(id:number, isComplete: boolean): Observable<Reminder>{
    return this.http.put<Reminder>(`${this.apiUrl}/${id}/${isComplete}`, {})
  }

  deleteReminder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }


}
