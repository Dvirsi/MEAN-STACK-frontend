import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/classes/task';
import { User } from 'src/app/classes/user';
import { UiService } from 'src/app/services/ui.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  sub1 : Subscription = new Subscription();
  sub2 : Subscription = new Subscription();
  sub3 : Subscription = new Subscription();
  sub4 : Subscription = new Subscription();

  endTodos : boolean = false;
  userMarked : boolean = false;
  openAddressDiv : boolean = false;
  userId : string = "";
  currentUrlId : string = "";

  @Input()
  user : User = new User();

  @Output()
  childDeleted : EventEmitter<string> = new EventEmitter<string>();

  constructor(private utils : UtilsService, private router : Router, private uiUtils : UiService)
   {

    // Change the user border to green when finish all tasks
    this.sub3 = this.uiUtils.onTasksCompleted()
    .subscribe((id : string)  => 
      {
        this.endTodos = id === this.user._id ? true : this.endTodos;
      })

    // Change the user border to red when add task to user
      this.sub4 = this.uiUtils.onAddNewTask()
      .subscribe((id : string) => 
      {
          this.endTodos = id === this.user._id ? false : this.endTodos;
      });
   }
   
   tasksCompleted() : void
   {
     let tasksCompleted = this.user.tasks.map((x:Task) => x.completed);
     this.endTodos = tasksCompleted.includes(false) ? false : true;
   }

  // Click on id will change the background color of this user to orange or green, depend on all tasks completed,
  // and change all other backgrounds to white
   backGroundCurrentUser() : string
   {
    let markUser = sessionStorage["currentUserId"] === this.user._id ? true : false;
    if(markUser)
    {
      return !this.endTodos ? 'hsla(9, 81%, 61%, 0.2)' : 'hsla(148, 63%, 31%, 0.2)';
    }
    else
    {
      return 'white';
    }
   }


   showMoreData() : void
   {
     sessionStorage["currentUserId"] = this.user._id;
     this.router.navigate(["todosAndPosts", this.user._id]);
   }
  
  updateUser(valid : boolean | null) : void
  {
    if(valid)
    {
      this.sub1 = this.utils.updateUser(this.user._id, this.user)
      .subscribe(() => {});
    }
  }

  deleteUser() : void
  {
    // Update the ui
    this.childDeleted.emit(this.user._id);

    // Remove background from user 
    sessionStorage["currentUserId"] = 0;

    // Back to homepage
    this.router.navigate([""]);
    
    // Delete from server
    this.sub2 = this.utils.deleteUser(this.user._id)
    .subscribe(() => {});
  }


  ngOnInit(): void {
    this.tasksCompleted();
  }

  ngOnDestroy()
  {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe(); 
    this.sub4.unsubscribe(); 
  }
}
