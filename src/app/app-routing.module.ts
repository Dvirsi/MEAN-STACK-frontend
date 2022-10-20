import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { TodosAndPostsComponent } from './components/todos-and-posts/todos-and-posts.component';

const routes: Routes = [{path : "addNewUser", component : AddUserComponent},
                        {path : "todosAndPosts/:id", component : TodosAndPostsComponent}]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
