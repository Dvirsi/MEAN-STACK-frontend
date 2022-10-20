import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/classes/task';
import { User } from 'src/app/classes/user';
import { UiService } from 'src/app/services/ui.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  sub1 : Subscription = new Subscription();
  sub2 : Subscription = new Subscription();
  
  @Input()
  task : Task = new Task();

  @Input()
  userData : User = new User();

  @Output()
  taskDeleted : EventEmitter<number> = new EventEmitter<number>();

  completed : boolean = false;
  currentTask : Task|undefined = new Task();

  constructor(private utils : UtilsService, private uiUtils : UiService) { }

  markAsCompleted() : void
  {
    // Update the UI
    this.completed = true;

    // Update the user data
    let currentTask = this.userData.tasks.find((x:Task) => x._id === this.task._id)

    if(currentTask != undefined)
    {
      currentTask.completed = true;
    }

      // Check if all tasks compleded
    let tasksCompleted = this.userData.tasks.map((x:Task) => x.completed);
    if(!tasksCompleted.includes(false))
    { 
      // update the ui if tasks completed
      this.uiUtils.toggleAllTaskCompleted(this.userData._id)
    }

    // Send the updated data to server
    this.sub1 = this.utils.updateUser(this.userData._id, this.userData)
    .subscribe((data:any) => console.log(data));
  }

  deleteTask() : void
  {
    let updatedTasks = this.userData.tasks.filter(x => x._id !== this.task._id);
    this.userData.tasks = updatedTasks;
    // Update the ui 
    this.taskDeleted.emit(this.task._id);
    // Update DB
    this.sub2 = this.utils.updateUser(this.userData._id, this.userData)
    .subscribe((data:any) => console.log(data)
    );
  }

  ngOnInit(): void {
    this.completed = this.task.completed;
    this.currentTask = this.userData.tasks.find((x:Task) => x._id === this.task._id)
  }

  ngOnDestroy() : void
  {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}


