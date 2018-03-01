import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
  	private authService:AuthService,
    private router:Router,
    private flashMessagesService: FlashMessagesService,    
  ) { }

  ngOnInit() {
  }

   onSignOutClick(){
    this.authService.logout();
    this.flashMessagesService.show('You are logged out', {cssClass:'alert-success', timeout:4000});
    this.router.navigate(['/login']);
  }

}
