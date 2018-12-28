import { Component } from '@angular/core';
import { Post } from './posts/post.model';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mean-course';
  enteredPosts: Post[] = [];

  onPostAdded(post) {
    this.enteredPosts.push(post);
  }
}
