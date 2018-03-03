import { Component,OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  isLoggedIn:boolean=false;
  loggedUser:any={};

  constructor(
  	private authService:AuthService,
  ) { }

  ngOnInit(){
  	this.authService.getAuth().subscribe(auth => {
  	 	console.log(auth);
  		if(auth){
  			console.log('Logged');
  			this.isLoggedIn=true;
  			this.loggedUser.email=auth.email;
  			this.loggedUser.name=auth.displayName;
  			this.loggedUser.id=auth.uid;
  		}else{
  			console.log('Logged out');
  			this.isLoggedIn=false;
  		}
  	})
  }
}
