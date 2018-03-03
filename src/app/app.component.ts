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
  	 	
  		if(auth){
  	
  			this.isLoggedIn=true;
  			this.loggedUser.email=auth.email;
  			this.loggedUser.name=auth.displayName;
  			this.loggedUser.id=auth.uid;
  		}else{
  	
  			this.isLoggedIn=false;
  		}
  	})
  }
}
