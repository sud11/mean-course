import { Component, EventEmitter, Output, OnInit, ViewChild } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  post: Post = { id : null, title : '', content : '' };
  mode: String = 'create';
  constructor(public postsService: PostsService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('Inside AppCreateComponent!!');
      console.log(params);
      if (params['id'] === undefined) {
        console.log('params is undefined');
      } else {
        this.onEditPost(params['id']);
      }
    });
  }
  onEditPost(id: any) {
    console.log('onEditPost _ ' + id );
    // set mode as edit;
    this.mode = 'edit';
    let myObservable = new Observable();
    myObservable = this.postsService.getPost(id);

    myObservable.subscribe((responseData: Post) => {
      console.log('Response in front end');
      this.post = responseData;
    });
  }

  onAddPost(form: NgForm) {
    console.log('onAddPost');
    this.post = {
      id : null,
      title: form.value.title,
      content : form.value.content};
    if (this.mode === 'create'){
      this.postsService.addPost(this.post);
    } else {
      this.postsService.updatePost(this.post);
    }
    form.reset();
  }
}
