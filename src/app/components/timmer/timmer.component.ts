import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeLog } from '../../models/time-log';
import { LogsService } from '../../services/logs.service';
import { DataService } from '../../services/data.service';

import * as moment from 'moment';
// import * as momentDurationFormatSetup from 'moment-duration-format';


@Component({
	selector: 'app-timmer',
	templateUrl: './timmer.component.html',
	styleUrls: ['./timmer.component.css']
})
export class TimmerComponent implements OnInit {

	timmer:TimeLog;
	timerTitle;string;
	startResume:boolean;

	constructor(
		public _logsService:LogsService,
		public _data:DataService
		) { 
    //var duration = moment.duration(2000);   
    //console.log(moment.utc(duration.asMilliseconds()).format("HH:mm:ss.S"));
  }

  ngOnInit() {
  	
  	this.initTimerLog();

     //Continue running timmer
     if( JSON.parse(localStorage.getItem('timerOn')) ){
     	
     	this.timmer=JSON.parse(localStorage.getItem('timerLogRecord'));  	 

     	if(this.timmer.running){
     		this.timmer.countMilliseconds= Date.now() - parseInt(localStorage.getItem('startOn'));
     		this.timmerTick();
     	}
     	
     }else{

     }

     //Resume log listner
     this._data.currentMsg.subscribe(msg=>{
     	console.log('Subject recived');
     	this.startResume=true;
     	this.resumeLog(msg);

     })
   }

   initTimerLog(){
   	this.timmer = {
   		
   		title:'',
   		running:false,
   		durations:<any>[],
   		count:"00:00:00.0",
   		countMilliseconds:0,  
   		time:{
   			mseconds:"0",
   			seconds:"00",
   			minutes:"00",
   			hours:"00"
   		},
   		createdAt:null,
   		updatedAt:null 

   	};
   	
   }

   startTimmer(){
   	
   	console.log('start');
   // console.log(this.timmer.$id);
   
   this.timmer.running=true;
    //console.log(this.timmer)
    localStorage.setItem('timerOn','true');
    localStorage.setItem('startOn', Date.now().toString() );
    localStorage.setItem('timerLogRecord',JSON.stringify(this.timmer));
    this.startResume=false;
    this.timmerTick();
  }

  timmerTick(){
  	var that=this
  	Observable.interval(100)
  	.takeWhile(() => this.timmer.running)
  	.subscribe(i => { 
  		that.timmer.countMilliseconds+=100;      
  		this.timmer.count=moment.utc(moment.duration(that.timmer.countMilliseconds).asMilliseconds()).format("HH:mm:ss.S");
  		this.timmer.time.mseconds=moment.utc(moment.duration(that.timmer.countMilliseconds).asMilliseconds()).format("S");
  		this.timmer.time.seconds=moment.utc(moment.duration(that.timmer.countMilliseconds).asMilliseconds()).format("ss");
  		this.timmer.time.minutes=moment.utc(moment.duration(that.timmer.countMilliseconds).asMilliseconds()).format("mm");
  		this.timmer.time.hours=moment.utc(moment.duration(that.timmer.countMilliseconds).asMilliseconds()).format("HH");

  	})
  	
  }


  stopTimmer(){
  	console.log('stop');
  	
  	this.timmer.running=false;  	
  	this.timmer.durations.push({
  		start:JSON.parse(localStorage.getItem('startOn')),
  		stop:Date.now()
  	})

  	if(this.timmer.title==''){
  		this.timmer.title="Untitled Record"
  	}

  	if(!this.timmer.$id){
      //add new record if no Id exists
      this.timmer.createdAt=Date.now();
      this._logsService.addLog(this.timmer);
    }else{
    	console.log('log updated');
    	this.timmer.updatedAt=Date.now();
    	this._logsService.updateLog(this.timmer);

    }
    
    localStorage.setItem('timerOn','false');
    localStorage.setItem('startOn', '' );
    localStorage.setItem('timerLogRecord','');
    
    this.initTimerLog();
  	//console.log(this.timmer);
  }

  switchTimmer(){
  	console.log('switch');
  	(!this.timmer.running)? this.startTimmer() : this.stopTimmer() ;
  }

  resumeLog(id:string){
  	console.log("resume started");

  	const _rec=this._logsService.getLogById(id);

  	_rec.subscribe(log=>{   
  		console.log('subject Obj:');      
  		console.log(log);      
  		if(this.startResume){
  			this.timmer=log;       
  			this.startTimmer();
  		}
  		
  	},
  	err => {
  		console.log('Received error:', err);
  	},
  	() => {
  		console.log('Completed');
  	}
  	);

  	

  	
  }

}
