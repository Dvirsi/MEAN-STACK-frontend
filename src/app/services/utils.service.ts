import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http : HttpClient) { }

  getAllUsers() : Observable<User[]>
  {
    return this.http.get<User[]>("http://localhost:3000/api/users");
  }

  getUser(id : string) : Observable<User>
  {
    return this.http.get<User>("http://localhost:3000/api/users/" + id);
  }

  updateUser(id : string, user : User) : Observable<Object>
  {
    return this.http.put("http://localhost:3000/api/users/" + id, user);
  }

  addNewUser(user : User) : Observable<Object>
  {
    return this.http.post("http://localhost:3000/api/users", user);
  }

  deleteUser(id : string) : Observable<Object>
  { 
    return this.http.delete("http://localhost:3000/api/users/" + id);
  }
}
