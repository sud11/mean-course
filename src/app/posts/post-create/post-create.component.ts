import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { NgForm } from "@angular/forms";

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

  onAddPost(form: NgForm) {
    const post: Post = {
      id : null,
      title: form.value.title,
      content : form.value.content};

    this.postsService.addPost(post);
    form.reset();
  }
}
