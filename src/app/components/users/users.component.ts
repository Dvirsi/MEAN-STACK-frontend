import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/classes/user';
import { UiService } from 'src/app/services/ui.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  sub1 : Subscription =new Subscription();
  sub2 : Subscription = new Subscription();

  users : User[] = [];
  usersToShow : User[] = [];

  constructor(private utils : UtilsService, private uiUtils : UiService, private router : Router) { 
    // Update the ui when user added 
    this.sub2 = this.uiUtils.onAddUser()
    .subscribe((user:User) => {
      // Add new user to beginning of users list
      this.usersToShow.unshift(user);
    })
  }

  searchUser(txt : string) : void
  {
    this.usersToShow = this.users.filter(x => x.name.includes(txt) || x.email.includes(txt))
  }

  // Remove user from ui after delete, updated from user comp
  childDeleted(id:string) : void
  {
    this.usersToShow = this.usersToShow.filter(x => x._id != id)
  }

  addNewUser(): void
  {
    // Remove background color from current user
    sessionStorage["currentUserId"] = 0;
    this.router.navigate(["addNewUser"]);
  }

  ngOnInit(): void {
    this.sub1 = this.utils.getAllUsers()
    .subscribe((data:User[]) => 
    {
      this.users = data;
      this.usersToShow = data;
    })
  }

  ngOnDestroy() : void
  {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}