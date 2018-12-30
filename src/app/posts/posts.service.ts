import { Post} from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService {
  // private posts so that it cannot be modified from outside
  private posts: Post[] = [];
  private postsUpdate = new  Subject<Post[]>();

  constructor(private http: HttpClient) {  }

  getPosts() {
    this.http.get< { message: string, posts: Post[]}>('http://localhost:3000/api/posts').subscribe( (postData) => {
      this.posts = postData.posts;
      this.postsUpdate.next([...this.posts]);
    });
  }

  getPostUpdateListener() {
    return this.postsUpdate.asObservable();
  }

  addPost( title: string, content: string) {
    const post: Post = { id: null, title: title, content: content};

    this.http.post('http://localhost:3000/api/posts', post).subscribe( (responseData) => {
      alert('post added successfully! : ResponseData : ' + responseData);
      console.log(responseData);
      this.posts.push(post);
      this.postsUpdate.next([...this.posts]);
    });
  }
}
