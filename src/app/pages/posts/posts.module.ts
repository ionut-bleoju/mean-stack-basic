import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostsRoutingModule } from './posts-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatCardModule, MatButtonModule, MatExpansionModule, MatProgressSpinnerModule } from '@angular/material';
import { PostListComponent } from './post-list/post-list.component';

@NgModule({
  declarations: [PostsComponent, PostCreateComponent, PostListComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class PostsModule { }
