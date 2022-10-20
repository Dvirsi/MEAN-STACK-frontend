import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UiService {


private tasksCompletedDubject = new Subject<string>();

private addNewTodoSubject = new Subject<string>();

private AddUserSubject = new Subject<User>();

  constructor() { }


  // Add parameter 
  toggleAllTaskCompleted(id : string) : void {
    this.tasksCompletedDubject.next(id);  
  }

  // Update user comp, change bg to green
  onTasksCompleted() : Observable<string> {
    return this.tasksCompletedDubject.asObservable();
  }

  // Called from todos and posts comp
  toggleNewTask(id : string) : void  {
    this.addNewTodoSubject.next(id);  
  }

  // Update user comp, change bg to red
  onAddNewTask() :Observable<string> {
    return this.addNewTodoSubject.asObservable();
  }


  // Called from add user comp
  toggleAddUser(user : User) : void {
    this.AddUserSubject.next(user);  
  }

  // Show the new user on users comp
  onAddUser() : Observable<User> {
    return this.AddUserSubject.asObservable();
  }

}
