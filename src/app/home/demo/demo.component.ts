import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import * as Typed from 'typed.js';

@Component({
	selector:'app-demo',
	templateUrl:'demo.component.html'
})

export class DemoComponent implements OnInit {
	minutes="00";
	seconds="00";
  milliseconds="0";
  countMilliseconds=0;
  running=true;

	constructor() {
		// code...
	}

	ngOnInit(){

    Observable.interval(100)
  	.takeWhile(() => this.running)
  	.subscribe(i => { 
      this.onRunDemo()
  	})

  	var typed = new Typed("#TitleInputDemo", {
        strings: [
          "Workout, running..",
          "Workout, swimming..",
          "Workout, Yoga Time!",
          "Write some cool code",
          "Clean up Code",
          "Learning React",
          "Walk dogs",
          "Watching TV",
          "Client meeting",
          "Leads following up",
          "Baking some pizza...!",
          "Car wash"

        ],
        smartBackspace: true ,
        typeSpeed: 70,
        backSpeed: 40,
        loop:true
    });

	}
  
  onRunDemo(){
  	  this.countMilliseconds+=100;      

  	  //RESET COUNTER AFTER 10 MINUTES
  		if(this.countMilliseconds==600000){
  			this.countMilliseconds=100;      
  		}
  		this.milliseconds=moment.utc(moment.duration(this.countMilliseconds).asMilliseconds()).format("S");
  		this.seconds=moment.utc(moment.duration(this.countMilliseconds).asMilliseconds()).format("ss");
  		this.minutes=moment.utc(moment.duration(this.countMilliseconds).asMilliseconds()).format("mm");

  }

}