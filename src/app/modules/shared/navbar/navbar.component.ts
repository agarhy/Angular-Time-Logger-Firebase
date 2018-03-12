import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn:boolean=false;
  loggedUser:any={};

  constructor(
  	private authService:AuthService,
    private router:Router,
    private flashMessagesService: FlashMessagesService, 
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
    this.flashMessagesService.show('You are logged out', {cssClass:'alert-success', timeout:4000});
    this.router.navigate(['/signin']);
  }

}
