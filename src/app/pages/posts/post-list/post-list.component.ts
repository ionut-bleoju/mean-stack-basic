import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from 'src/app/shared/post.model';
import { PostsService } from 'src/app/shared/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSubscription: Subscription;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSubscription = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      }
      );
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

  onDelete(id: string) {
    this.postsService.deletePost(id);
  }

}
