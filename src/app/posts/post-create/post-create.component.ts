import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';

  constructor(public postsService: PostsService) {
  }


  onAddPost() {
    const post: Post = { title: this.enteredTitle,
      content : this.enteredContent};
    this.postsService.addPost(post.title, post.content);
  }
}
