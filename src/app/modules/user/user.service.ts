import { Injectable } from '@angular/core';
import { User } from './User';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  usersCollectionRef: AngularFirestoreCollection<User>;
  userDoc: Observable<User[]>;
 // currentUser: Observable<User[]>;

  constructor(
  	private authService:AuthService,
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

  updateUser(user:User){

     const recordDoc= this._angularFireStore.doc<User>('users/'+user.$id); 

     return new Promise((resolve , reject)=>{
      recordDoc.update(user).then(()=>{
        resolve(true);
      }).catch(err=>{
        reject(err);
      })
     })

  }

  FireAuthSignup(formData:any){
  	console.log(formData);
  	return new Promise((resolve , reject)=>{
  	this.authService.register(formData.email, formData.password)
		.then((userData:User) => {
			console.log(userData);
			const _newUser:any = {
				uid:userData.uid,
				name:formData.username,
			  settings:{
				  notifications:{
					  a:true,
					  b:false,
					  c:false
				  },
				  timezone:"UTC",
				  dateformat:"MM-DD-YY",
				  timeformat:"24",
				  durationformat:"full"
			  },
			  timelogs:{}
		  };

		  this.CreateNewUser(_newUser);
		  localStorage.setItem('userDocId',_newUser.uid);
		  resolve(true);
	})
		.catch((err) => {
			reject(err.message);
		});

	});
  }

}
