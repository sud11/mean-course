import { Component, EventEmitter, Output, OnInit, ViewChild } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
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

    this.route.paramMap.subscribe( (paramMap: ParamMap) => {
      if(paramMap.has('postId')) {
          this.onEditPost(paramMap.get('postId'));
          this.mode = 'edit';
      } else {
        this.mode = 'create';
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
      console.log(responseData);
      this.post = responseData;
    });
  }

  onSavePost(form: NgForm) {
    console.log('onAddPost');
    if (this.mode === 'create') {
      this.post = {
        id : null,
        title: form.value.title,
        content : form.value.content};

      this.postsService.addPost(this.post);
    } else {
        this.post.title = form.value.title;
        this.post.content = form.value.content;
        this.postsService.updatePost(this.post);
      }

    form.reset();
  }
}
