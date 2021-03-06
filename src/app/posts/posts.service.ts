import { Post} from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { stringify } from 'querystring';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';

@Injectable({providedIn: 'root'})
export class PostsService {

  // private posts so that it cannot be modified from outside
  private posts: Post[] = [];
  private postsUpdate = new  Subject<Post[]>();

  constructor(private http: HttpClient) {  }

  getPosts() {
    this.http
      .get< { message: string, posts: any}>('http://localhost:3000/api/posts')
      .pipe( map( (postData) => {
        return postData.posts.map( (post: { title: any; content: any; _id: any; }) => {
          return {
             title : post.title,
             content : post.content,
             id : post._id
          };
        });
      }))
      .subscribe( transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdate.next([...this.posts]);
    });
  }
  getPost(postId: String) {
    console.log('inside getPost in posts.service');
    console.log(postId);
    // Return an observable. No need to subscribe here.
    return this.http.get< { message: string, post: any}>('http://localhost:3000/api/posts/' + postId)
    .pipe( map( (postData) => {
      return {
             title : postData.post.title,
             content : postData.post.content,
             id : postData.post._id
      };
    }));
  }

  getPostUpdateListener() {
    return this.postsUpdate.asObservable();
  }

  addPost(post: Post) {
    this.http.post < {message: string, postId: string} >('http://localhost:3000/api/posts', post).subscribe( (responseData) => {
        console.log(responseData.postId);
        post.id = responseData.postId;
        this.posts.push(post);
        this.postsUpdate.next([...this.posts]);
     });
  }

  deletePost( postId: string) {

    console.log('inside deletePost in posts.service');
    console.log(postId);
    this.http.delete('http://localhost:3000/api/posts/' + postId).subscribe( () => {
    const updatedPosts = this.posts.filter(post => post.id !== postId);
    this.posts = updatedPosts;
    this.postsUpdate.next([...this.posts]);
    console.log('Deleted!');
    });
  }

  updatePost(post: Post) {
    console.log('in post service, updatepost' + post);
    this.http.put < {message: string} >('http://localhost:3000/api/posts/' + post.id, post).subscribe( (responseData) => {
      console.log(responseData);
      // update locally
   });
  }
}
