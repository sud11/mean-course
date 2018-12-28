import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: [ './post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  private postsSub: Subscription;
  // posts = [
  //   { title: 'First Post', content: 'First post title' },
  //   { title: 'Second Post' , content: 'Second post title' },
  //   { title: 'Third Post' , content: 'Third post title' }
  // ];

  constructor(public postsService: PostsService) {  }

  ngOnInit() {
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((post: Post[]) => {
      this.posts = post;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
