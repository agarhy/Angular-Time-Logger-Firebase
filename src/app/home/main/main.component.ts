import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  
   isLoggedIn:boolean=false;
  loggedUser:any={};
  
  constructor(
  	private authService:AuthService,
    private router:Router,    
  ) { }

  ngOnInit() {
   //console.log(this.authService.getCurrentUser());
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

  onSignOutClick(){
    this.authService.logout();
    
  }

}
