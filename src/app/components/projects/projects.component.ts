import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';

import { Project } from '../../models/Project';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects:Project[];

  constructor(
    private _projectService:ProjectService
  ) { }

  ngOnInit() {
    
    this._projectService.getAll().subscribe(projects=>{

    	this.projects=projects.map(record=>{
        return record;
    	});
    })
  }

  onSubmit(form){
	  console.log(form);
  	if(form.valid){
  	  const _project:Project={
  		  name:form.value.projectName
  	  };

  	  this._projectService.create(_project);

    }else{

    }
  
  }
  
  deleteProject(id:string){

  	this._projectService.delete(id);
  }
}
