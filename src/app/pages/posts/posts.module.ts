import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostsRoutingModule } from './posts-routing.module';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatCardModule, MatButtonModule, MatExpansionModule } from '@angular/material';
import { PostListComponent } from './post-list/post-list.component';
import { PostsService } from 'src/app/shared/posts.service';

@NgModule({
  declarations: [PostsComponent, PostCreateComponent, PostListComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
  ],
  providers: []
})
export class PostsModule { }
