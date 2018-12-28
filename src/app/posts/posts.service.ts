import { Post} from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService {
  // private posts so that it cannot be modified from outside
  private posts: Post[] = [];
  private postsUpdate = new  Subject<Post[]>();

  getPosts() {
    // to return a copy of posts
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdate.asObservable();
  }

  addPost( title: string, content: string) {
    const post: Post = {title: title, content: content};
    this.posts.push(post);
    this.postsUpdate.next([...this.posts]);
  }
}
