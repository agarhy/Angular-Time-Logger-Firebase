import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../modules/user/user.service';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
	
	isLoggedIn:boolean=false;
	loggedUser:any={};

  // username:string='';
  // email:string='';
  // password:string='';
  // 
  signUpFormHasError:boolean=false;
  signUpFormError:string;

  constructor(
  	private authService:AuthService,
  	private router:Router,    
  	private UserService:UserService
  	) { }

  ngOnInit() {
   //console.log(this.authService.getCurrentUser());
   this.authService.getAuth().subscribe(auth => {

   	if(auth){
   		
   		this.isLoggedIn=true;
   		this.loggedUser.email=auth.email;
   		this.loggedUser.name=auth.displayName;
   		this.loggedUser.id=auth.uid;
   		console.log(this.loggedUser);
   		var uDocId=localStorage.getItem('userDocId');
   		console.log(uDocId);

   	}else{

   		this.isLoggedIn=false;
   	}
   })
 }
 
 demoTimer(){
 	
 }


 onSignupSubmit(formData:any){
 	this.signUpFormHasError=false;
 	this.signUpFormError='';

 	this.UserService.FireAuthSignup(formData.value).then(()=>{
 		formData.resetForm();
 		this.signUpFormHasError=false;
 		this.signUpFormError='';

 	}).catch((err)=>{

 		this.signUpFormHasError=true;
 		this.signUpFormError=err;
 	});
 }

  onSignOutClick(){
    this.authService.logout();
    localStorage.setItem('userDocId','');

    this.router.navigate(['/']);
  }

}
