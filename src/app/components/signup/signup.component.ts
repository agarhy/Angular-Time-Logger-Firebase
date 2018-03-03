import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { User } from '../../models/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  name:string;
  email:string;
  password:string;

  constructor(
  	private authService:AuthService,
  	private userService:UserService,
    private router:Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }



  onSubmit(){
    this.authService.register(this.email, this.password)
      .then((userData:User) => {

  		const _newUser:any = {
  			uid:userData.uid,
			name:this.name,
			//email:this.email,	
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

  		this.userService.CreateNewUser(_newUser);
        this.flashMessage.show('New user registered', {cssClass:'alert-success', timeout:4000});
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.flashMessage.show(err.message, {cssClass:'alert-danger', timeout:4000});
        this.router.navigate(['/register']);
      });
  }

}
