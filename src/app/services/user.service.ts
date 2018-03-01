import { Injectable } from '@angular/core';
import { User } from '../models/User';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  usersCollectionRef: AngularFirestoreCollection<User>;
  userDoc: Observable<User[]>;
  constructor(
  	private _angularFireStore: AngularFirestore
  ) { 
  	this.usersCollectionRef=this._angularFireStore.collection<User>('users');
  }

  CreateNewUser(userData:User){
  	this.usersCollectionRef.add(userData);
  }

  getUserByUid(id:string){
  	//this.userDoc=this._angularFireStore.doc<User>('users/'+id);
  	const query=this._angularFireStore.collection('users', ref => ref.where('uid', '==', id));

  	return this.userDoc=query.snapshotChanges().map(user=>{
  		return user.map(document=>{
  			const data = document.payload.doc.data() as User;
          const $id = document.payload.doc.id;
          return { $id, ...data };
  		})
  	});

  }

}
