import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(public afAuth:AngularFireAuth) { }

  // Register User
  register(email:string, password:string){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }

  // Login user
  login(email:string, password:string){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
        err => reject(err));
    });
  }

  // Check user status
  getAuth(){
   // console.log(this.afAuth.authState);
    return this.afAuth.authState;
  }

  // Logout User
  logout(){
    this.afAuth.auth.signOut().then(res=>console.log('loged out')).catch(err=> console.log(err));
  }

}
