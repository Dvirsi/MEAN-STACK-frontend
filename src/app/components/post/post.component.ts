import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/classes/post';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input()
  post : Post = new Post();

  @Output()
  postDeleted : EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  // Delete post from ui
  deletePost()
  {
    this.postDeleted.emit(this.post._id);
  }

  ngOnInit(): void {
   
  }

}