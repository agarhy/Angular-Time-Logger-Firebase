import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Store } from '@ngrx/store';
import { timerState } from '../../timer/timer.reduce';
import { Observable } from 'rxjs';
import { TimeLog } from '../../timer/time-log';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  timer: Observable<TimeLog>;
  constructor(
  	private authService:AuthService,
    private router:Router,
    private flashMessagesService: FlashMessagesService, 
    private store:Store<timerState>   
  ) {
    this.timer = this.store.select('TimerStore').select('timer');
   }

  ngOnInit() {
  }

   onSignOutClick(){
    this.authService.logout();
    this.flashMessagesService.show('You are logged out', {cssClass:'alert-success', timeout:4000});
    this.router.navigate(['/login']);
  }

}
