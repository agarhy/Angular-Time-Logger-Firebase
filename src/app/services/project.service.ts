import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Project } from '../models/Project';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ProjectService {

  projectsCollection: AngularFirestoreCollection<Project>;
  projects: Observable<Project[]>;
  projectDoc: AngularFirestoreDocument<Project>;

	uDocId:string;

  constructor(
  	private _angularFireStore: AngularFirestore
  ) {
    
    this.uDocId=localStorage.getItem('userDocId');
    this.projectsCollection=this._angularFireStore.collection<Project>('users/'+this.uDocId+'/projects');

  }

  create(_project:Project){
  	console.log(_project);
  	this.projectsCollection.add(_project);
  }

  getAll(){
    
    this.projects= this.projectsCollection.snapshotChanges().map(logs =>{
      return logs.map(record =>{
      const data = record.payload.doc.data() as Project;
          const $id = record.payload.doc.id;
          return { $id, ...data };
      })
    });
  	return this.projects;
  }

  delete(_id:string){
    this.projectDoc= this._angularFireStore.doc<Project>('users/'+this.uDocId+'/projects/'+_id);
  	this.projectDoc.delete();
  }

  update(project:Project){
     this.projectDoc= this._angularFireStore.doc<Project>('users/'+this.uDocId+'/projects/'+project.$id); 
     this.projectDoc.update(project);
  }

}
