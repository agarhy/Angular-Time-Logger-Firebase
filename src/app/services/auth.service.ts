import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  constructor(
    public afAuth:AngularFireAuth,   
   ) { }

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

  getCurrentUser(){
    return this.afAuth.auth.currentUser;
  }

  checkCurrentPassword(pass:string){

      return this.afAuth.auth.currentUser.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(this.afAuth.auth.currentUser.email, pass));
  }

  updateUserName(name:string){
    return new Promise ((resolve , reject)=>{
       this.afAuth.auth.currentUser.updateProfile({
        displayName: name,
        photoURL: ""
      }).then(function() {
        resolve(true);
      }).catch(function(err) {
        reject(err)
      });
    });
  }

  updateUserEmail(email:string){
    return new Promise ((resolve , reject)=>{
       this.afAuth.auth.currentUser.updateEmail(email).then(function() {
        resolve(true);
      }).catch(function(err) {
        reject(err)
      });
    });
  }

  changeUserPassword(newPassword:string){
    return new Promise ((resolve , reject)=>{
       this.afAuth.auth.currentUser.updatePassword(newPassword).then(function() {
        resolve(true);
      }).catch(function(err) {
        reject(err)
      });
    });
   
  }
  // Logout User
  logout(){
    this.afAuth.auth.signOut().then(res=>console.log('loged out')).catch(err=> console.log(err));
  }

}
