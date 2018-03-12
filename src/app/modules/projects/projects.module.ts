import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectsComponent } from './projects/projects.component';

import { ProjectService } from './project.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ProjectsComponent
  ],
  providers:[
    ProjectService
  ]
})
export class ProjectsModule { }
