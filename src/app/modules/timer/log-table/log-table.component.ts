import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LogsService } from '../logs.service';
import { TimeLog } from '../time-log';
import * as moment from 'moment';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/from';
import 'rxjs/operators';


@Component({
	selector: 'app-log-table',
	templateUrl: './log-table.component.html',
	styleUrls: ['./log-table.component.css']
})
export class LogTableComponent implements OnInit {
	//@Output() resumeLogRecord = new EventEmitter<String>();

	records:any[];
	recordsGrouped:any[]=[];
	//_rx:Observable<any>;

	constructor(
		public _logsService:LogsService,
		public _data:DataService
		
		) { }

	ngOnInit() {
		this._logsService.getLogs().subscribe(logs => {
			//console.log(logs);

			this.records= logs.map(c=>{
  			//console.log(c.count);
  			c.count=moment.utc(moment.duration(c.count).asMilliseconds()).format("HH:mm:ss.S");
  			c.time.mseconds=moment.utc(moment.duration(c.count).asMilliseconds()).format("S");
  			c.time.seconds=moment.utc(moment.duration(c.count).asMilliseconds()).format("ss");
  			c.time.minutes=moment.utc(moment.duration(c.count).asMilliseconds()).format("mm");
  			c.time.hours=moment.utc(moment.duration(c.count).asMilliseconds()).format("HH");

  			c.durations.map(d=>{
  				d.time=moment.utc(moment.duration((d.stop-d.start)).asMilliseconds()).format("HH:mm:ss");

          d.start=moment.utc(moment.duration(d.start).asMilliseconds()).format("HH:mm:ss");
          d.stop=moment.utc(moment.duration(d.stop).asMilliseconds()).format("HH:mm:ss");


  			})

  			return c;
  		});
  		this.recordsGrouped=[];
      this.applyFilters();
  		//console.log(this.records);
  	})
		
	}

  applyFilters(){
  	let src= Observable.from(this.records)
      .groupBy(
        function (x) { 
        	return x.$day;         
        },
        //function (x) { return {day:x.$day,elm:x} }
        ).flatMap(group => group.reduce((acc, curr) => [...acc, ...curr], []));
    
    var sub=src.subscribe(obj=>{
    
      //  console.log({day:obj[0].$day, records:obj});
        var day=obj[0].$day;
        var sumTime=0;
        var records=obj.map(el=> {
        	delete el.$day;
        	sumTime+=el.countMilliseconds;
        	return el;
        })
        this.recordsGrouped.push({
        	day:day,
        	sumTime:moment.utc(moment.duration(sumTime).asMilliseconds()).format("HH:mm:ss"),
        	records:records
        });
    
    },
    function (err) {
        console.log('Error: ' + err);   
    },
    function () {
        console.log('Completed');   
    });
  }
	deleteLog(id:string){
		this._logsService.deleteLog(id);
	}

	resumeLog(id:string){
  	//const _rec=this._logsService.getLogById(id);
  	console.log('resume  id sent')
  	this._data.changeMessage(id);
  	//this.resumeLogRecord.emit(id);
  	//console.log(id);
  }

  TrackLogByFn(index, log){
     return log.$id; //
   }
   TrackDurationByFn(index, duration){
     return duration.start; //
   }

 }
