import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Post } from 'src/app/shared/post.model';
import { PostsService } from 'src/app/shared/posts.service';
import { mimeType } from './type.validator';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  private mode = 'create';
  isLoading = false;
  form: FormGroup;

  private postId: string = null;
  post: Post;
  imagePreview: string;

  constructor(private postsService: PostsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    });
    this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        if (paramMap.has('postId')) {
          this.mode = 'edit';
          this.postId = paramMap.get('postId');
          this.isLoading = true;
          this.postsService.getPost(this.postId)
            .subscribe(data => {
              this.isLoading = false;
              this.post = { id: data._id, title: data.title, content: data.content };
              this.form.setValue({ title: this.post.title, content: this.post.content });
            });

        } else {
          this.mode = 'create';
          this.postId = null;
        }
      });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onAddPost() {
    if (this.form.valid) {
      this.isLoading = true;
      if (this.mode === 'create') {
        const post: Post = {
          id: null,
          title: this.form.value.title,
          content: this.form.value.content
        };
        this.postsService.addPost(post);
      } else {
        const post: Post = {
          id: this.post.id,
          title: this.form.value.title,
          content: this.form.value.content
        };
        this.postsService.updatePost(post);
      }
    }
    this.form.reset();
  }

}
