import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/classes/post';
import { Task } from 'src/app/classes/task';
import { User } from 'src/app/classes/user';
import { UiService } from 'src/app/services/ui.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-todos-and-posts',
  templateUrl: './todos-and-posts.component.html',
  styleUrls: ['./todos-and-posts.component.css']
})
export class TodosAndPostsComponent implements OnInit {

  userId : string = "";
  userData : User = new User();
  userTasks : Task[] = [];
  userPosts : Post[] = [];

  todoOrAdd : boolean = false;
  postOrAdd : boolean = false;

  sub1 : Subscription = new Subscription();
  sub2 : Subscription = new Subscription();
  sub3 : Subscription = new Subscription();
  sub4 : Subscription = new Subscription();
  sub5 : Subscription = new Subscription();

  constructor(private utils : UtilsService, private ar : ActivatedRoute, private router : Router, private uiUtils : UiService) {}
  
  addNewTask(title : string, isValid : boolean | null) : void
  {
    if(isValid)
    {
      // Get all id`s to generate a new one
      let allTasksIds = this.userData.tasks.map((x:Task) => x._id);

      // check if its the first task
      let hasId = Math.max(...allTasksIds) > 0;

      // Find the biggest ID and create a new one if its not the first task, else it srtat at 1
      let biggestId = hasId ? Math.max(...allTasksIds) + 1 : 1;

      let obj : Task = {_id : biggestId , title, completed : false};
      this.userData.tasks.push(obj);

      // Update DB
      this.sub3 = this.utils.updateUser(this.userData._id, this.userData)
      .subscribe(() => 
      {
        // Change border color of user to red
        this.uiUtils.toggleNewTask(this.userData._id);
      })
      // Back to tasks
      this.todoOrAdd = ! this.todoOrAdd;
    }
  }

  taskDeleted(id:number) : void
  {
    this.userTasks = this.userTasks.filter(x => x._id !== id);
  }

  addNewPost(title : string, body : string) : void
  {
    // Generate a new ID
    let allTpostsIds = this.userData.posts.map((x:Post) => +x._id);
    let hasId = Math.max(...allTpostsIds) > 0;
    let biggestId = hasId ? Math.max(...allTpostsIds) + 1 : 1;

    // Update ui and DB
    let obj : Post = {_id : biggestId, title, body};
    this.userData.posts.push(obj);
    this.sub4 = this.utils.updateUser(this.userData._id, this.userData)
    .subscribe(() => {});
    // Back to posts
    this.postOrAdd = ! this.postOrAdd
  }

  postDeleted(id:number) : void
  {
    this.userPosts = this.userPosts.filter(x => x._id !== id);
    this.userData.posts = this.userPosts;
    this.sub5 = this.utils.updateUser(this.userId, this.userData)
    .subscribe(() => {})
  }

  ngOnInit(): void {    
    this.sub1 = this.ar.params
    .subscribe((param:any) => 
    {
      this.userId = param.id
      this.sub2 = this.utils.getUser(this.userId)
      .subscribe((data:User) => 
      {
        this.userPosts = data.posts;
        this.userTasks = data.tasks;
        this.userData = data;
      });
    })
  }

  ngOnDestroy() : void
  {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    this.sub4.unsubscribe();
    this.sub5.unsubscribe();
  }

}
