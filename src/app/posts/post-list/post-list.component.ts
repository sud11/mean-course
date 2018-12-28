import { Component, Input } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: [ './post-list.component.css']
})

export class PostListComponent {

  @Input() posts: Post[] = [];
  // posts = [
  //   { title: 'First Post', content: 'First post title' },
  //   { title: 'Second Post' , content: 'Second post title' },
  //   { title: 'Third Post' , content: 'Third post title' }
  // ];
}
