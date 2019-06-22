import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from 'src/app/shared/posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  constructor(private postsService: PostsService) { }

  ngOnInit() {
  }

  onAddPost(form: NgForm) {
    if (form.valid) {
      const post: Post = {
        id: '1',
        title: form.value.title,
        content: form.value.content
      };
      this.postsService.addPost(post);
      form.reset();
    }
  }

}
