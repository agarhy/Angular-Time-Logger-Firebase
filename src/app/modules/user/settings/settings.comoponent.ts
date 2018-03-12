import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { User } from '../User';


@Component({
	selector: 'app-settings',
	templateUrl: './settings.comoponent.html'
})

export class SettingsComponent implements OnInit {
	
	user:any={};
	password:any={
		current:'',
		new:'',
		confirm:''

	};

	constructor(
		private router:Router,
		private authService:AuthService,
		private userService:UserService,
		private flashMessagesService: FlashMessagesService,
	) {
		this.user={$id: "", email: "", name: "", settings: {
			notifications:{
				a:'',
				b:'',
				c:'',
			}
		}}

	
	}

	ngOnInit(){
		this.password={};
		this.authService.getAuth().subscribe(auth => {
	      if(auth){
	       //console.log(auth.uid);
	       this.userService.getUserByUid(auth.uid).subscribe(user=>{
	       	console.log(user[0]);
	       	this.user=user[0];
	       	this.user.email=auth.email;
	       });
	      } else {
	    
	      }

	      
	    });
	}

	updaeUserName(){

		const _that=this;
		const userDoc=this.user;
		userDoc.email='';
		this.userService.updateUser(userDoc).then(function() {				
			_that.flashMessagesService.show('Your Name Updated',{cssClass:'alert-success',timeout:4000})	

			_that.authService.updateUserName(userDoc.name).then(function() {		
			}).catch(function(err) {	          	       			    
		    });

		}).catch(function(err) {	          	       
	        _that.flashMessagesService.show(err.message,{cssClass:'alert-danger',timeout:4000})
	    });


	}

	updateUserSetting(){
		console.log(this.user);
		const _that=this;
		const userDoc=this.user;
		userDoc.email='';
		this.userService.updateUser(userDoc).then(function() {				
			_that.flashMessagesService.show('Settings Updated',{cssClass:'alert-success',timeout:4000})	

		}).catch(function(err) {	          	       
	        _that.flashMessagesService.show(err.message,{cssClass:'alert-danger',timeout:4000})
	    });


	}

	onSubmit({value, valid}:{value:any, valid:boolean}){
		
		if(valid){
			const _that=this;
			this.authService.checkCurrentPassword(value.currentPassowrd).then(function() {					
					_that.authService.updateUserEmail(value.email).then(()=>{
						_that.flashMessagesService.show('Email Updated',{cssClass:'alert-success',timeout:4000})
						_that.password={};
						_that.router.navigate(['settings']);
					}).catch(err=>{
						_that.password={};
						_that.flashMessagesService.show(err,{cssClass:'alert-danger',timeout:4000})
					})
			
			}).catch(function(err) {
		          	       
		          _that.password={};
		          _that.flashMessagesService.show(err.message,{cssClass:'alert-danger',timeout:4000})

		    });
		}else{
			this.password={};
			this.flashMessagesService.show('Please fill in all fields',{cssClass:'alert-danger',timeout:4000})
		}
	}

	onSubmitChangePassword({value, valid}:{value:any, valid:boolean}){

		if(valid){
			const _that=this;
			this.authService.checkCurrentPassword(value.currentPassowrd).then(function() {
	        	console.log('dogru');
	        	if(value.newPassword === value.ConfirmNewPassword){
		        	_that.authService.changeUserPassword(value.newPassword).then(()=>{
		        		_that.flashMessagesService.show('Password Changed',{cssClass:'alert-success',timeout:4000});
		        		_that.password={};
		        		_that.router.navigate(['settings']);
		        	}).catch(err=>{
		        		_that.password={};
		        		_that.flashMessagesService.show(err.message,{cssClass:'alert-danger',timeout:4000})
		        	})
		        }else{
		        	_that.password={};
		        	_that.flashMessagesService.show('New Password Dont Match',{cssClass:'alert-danger',timeout:4000})
		        }
		        
		    }).catch(function(err) {
		          
		          _that.password={};	       
		          _that.flashMessagesService.show(err.message,{cssClass:'alert-danger',timeout:4000})

		    });
		}else{
			this.password={};
			this.flashMessagesService.show('All fields are required',{cssClass:'alert-danger',timeout:4000})
		}
		
		
	}
}
