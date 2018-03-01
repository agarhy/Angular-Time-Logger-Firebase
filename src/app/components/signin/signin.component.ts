import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  email:string;
  password:string;

  constructor(
  	private router:Router,
  	private authService:AuthService,  
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.authService.login(this.email, this.password)
      .then((res) => {
        this.flashMessagesService.show('You are logged in', { cssClass: 'alert-success', timeout: 4000 });
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.flashMessagesService.show(err.message, { cssClass: 'alert-danger', timeout: 4000 });
        this.router.navigate(['/login']);
      });
  }


}
