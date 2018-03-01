import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { User } from '../../models/User';


@Component({
	selector: 'app-settings',
	templateUrl: './settings.comoponent.html'
})

export class SettingsComponent implements OnInit {
		
	user:User;

	constructor(
		private router:Router,
		private authService:AuthService,
		private userService:UserService,
		private flashMessagesService: FlashMessagesService,
	) {


	
	}

	ngOnInit(){
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
}
