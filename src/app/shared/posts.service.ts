import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './post.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class PostsService {
  private posts: Post[] = [];
  private postsUpdated: Subject<Post[]> = new Subject<Post[]>();
  constructor(private http: HttpClient, private router: Router) { }

  getPosts() {
    this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
      .pipe(map((data) => {
        return data.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe((data) => {
        this.posts = data;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(post: Post) {
    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
      .subscribe((data) => {
        post.id = data.postId;
        this.posts = [post, ...this.posts];
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });

  }

  getPost(id: string) {
    return this.http.get<{ _id: string, title: string, content: string }>(`http://localhost:3000/api/posts/${id}`);
  }

  updatePost(post: Post) {
    this.http.patch<{ message: string }>(`http://localhost:3000/api/posts/${post.id}`, post)
      .subscribe(data => {
        const updatedPostIndex = this.posts.findIndex(updatedPost => updatedPost.id === post.id);
        const auxPosts = [...this.posts];
        auxPosts[updatedPostIndex] = post;
        this.posts = auxPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  deletePost(id: string) {
    this.http.delete(`http://localhost:3000/api/posts/${id}`)
      .subscribe(() => {
        this.posts = [...this.posts.filter(post => post.id !== id)];
        this.postsUpdated.next([...this.posts]);
      });
  }
}
