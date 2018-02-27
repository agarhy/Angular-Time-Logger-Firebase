import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeLog } from '../../models/time-log';
import { LogsService } from '../../services/logs.service';
import { DataService } from '../../services/data.service';

import * as moment from 'moment';
// import * as momentDurationFormatSetup from 'moment-duration-format';


@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent implements OnInit {
  clock:number=0;
  _clockFormated:string="00:00:00.0";
  clockOn:boolean;
  _TimeLog:TimeLog= {
  	_id:null,
	running:false,
	startOn:null,
	stopOn:null,
	count:0,
	title:''
	};

  constructor(
    public _logsService:LogsService,
    public _data:DataService
    ) { 
  //	let moment = require('moment'); // add this 1 of 4

    var duration = moment.duration(2000);
    
    console.log(moment.utc(duration.asMilliseconds()).format("HH:mm:ss.S"));

  }

  ngOnInit() {
  	this.clockOn=false;

  	 if( JSON.parse(localStorage.getItem('timerOn')) ){
  	 	
  	 	this._TimeLog=JSON.parse(localStorage.getItem('timerLogRecord'));
  	 	this.clockOn=true;
  	 	this.clock=this._TimeLog.count + ((Date.now())-this._TimeLog.startOn);
  	 	this.timerTick();

  	 	// console.log(Date.now());
  	 	// console.log(this._TimeLog.startOn);
  	 }

     this._data.currentMsg.subscribe(msg=>{
       console.log(msg);
       const _rec=this._logsService.getLogById(msg);

      _rec.subscribe(log=>{
        this._TimeLog=log;
        console.log(this._TimeLog);
      });
     })
  }

  startClock(){
  	
  	console.log('start');

  	this.clockOn=true;
  	this._TimeLog.running=true;
  	this._TimeLog.startOn=Date.now();

  	localStorage.setItem('timerOn','true');
  	localStorage.setItem('timerLogRecord',JSON.stringify(this._TimeLog));

  	
  	console.log(this._TimeLog);
	this.timerTick();
  }

  stopClock(){
  	console.log('stop');
  	this.clockOn=false;
  	this._TimeLog.stopOn=Date.now();
  	this._TimeLog.running=false;
  	this._TimeLog.count=this.clock;

    this._logsService.addLog(this._TimeLog);

  	localStorage.setItem('timerOn','false');
  	localStorage.setItem('timerLogRecord','');
  	console.log(this._TimeLog);
  }

  timerTick(){
  	var that=this
  	Observable.interval(100)
    .takeWhile(() => this.clockOn)
    .subscribe(i => { 
       that.clock+=100;      
       this._clockFormated=moment.utc(moment.duration(that.clock).asMilliseconds()).format("HH:mm:ss.S");
       //console.log(this._clockFormated);
    })


  	
  }

  ClearClock(){
  	this.clock=0;
  	this._clockFormated="00:00:00.0"
  }
  switchClock(){
  	console.log('swicth');
  	(!this.clockOn)? this.startClock() : this.stopClock() ;
  }

  resumeLog(id){
    console.log(id);
  }
}
