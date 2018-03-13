import { Title } from '@angular/platform-browser';
import { Component,OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Store } from '@ngrx/store';
import { timerState } from './modules/timer/timer.reduce';
import { Observable } from 'rxjs';
import { TimeLog } from './modules/timer/time-log';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'Hello to App LOGGER!';

	isLoggedIn:boolean=false;
	loggedUser:any={};

	constructor(
		private authService:AuthService,
		private store:Store<timerState>,
		private titleService: Title
		) { 
		
    this.store.select('TimerStore').select('timer').subscribe(timer=>
		{
			if(timer.running){
				this.setTitle(timer.time.minutes+':'+timer.time.seconds+" - "+ timer.title);
			}else{
				this.setTitle(this.title);
			}
		}
		);
	}

	ngOnInit(){
		this.setTitle(this.title);

		
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

	public setTitle( newTitle: string) {
		this.titleService.setTitle( newTitle );
	}
}
