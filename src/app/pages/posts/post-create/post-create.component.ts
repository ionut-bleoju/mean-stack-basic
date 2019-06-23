import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from 'src/app/shared/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  private mode = 'create';
  private postId: string = null;
  post: Post;
  isLoading = false;
  constructor(private postsService: PostsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        if (paramMap.has('postId')) {
          this.mode = 'edit';
          this.postId = paramMap.get('postId');
          this.isLoading = true;
          this.postsService.getPost(this.postId)
            .subscribe(data => {
              this.isLoading = false;
              this.post = { id: data._id, title: data.title, content: data.content }
            });

        } else {
          this.mode = 'create';
          this.postId = null;
        }
      });
  }

  fillForm() {

  }

  onAddPost(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      if (this.mode === 'create') {
        const post: Post = {
          id: null,
          title: form.value.title,
          content: form.value.content
        };
        this.postsService.addPost(post);
      } else {
        const post: Post = {
          id: this.post.id,
          title: form.value.title,
          content: form.value.content
        };
        this.postsService.updatePost(post);
      }
    }
    form.resetForm();
  }

}
