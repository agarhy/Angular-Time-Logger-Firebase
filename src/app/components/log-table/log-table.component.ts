import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LogsService } from '../../services/logs.service';
import { TimeLog } from '../../models/time-log';
import * as moment from 'moment';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-log-table',
  templateUrl: './log-table.component.html',
  styleUrls: ['./log-table.component.css']
})
export class LogTableComponent implements OnInit {
	@Output() resumeLogRecord = new EventEmitter<String>();

  	records:TimeLog[];

  constructor(
  	public _logsService:LogsService,
  	public _data:DataService
  	) { }

  ngOnInit() {
  	this._logsService.getLogs().subscribe(logs => {
  		this.records= logs.map(c=>{
  			console.log(c.count);
  			c.count=moment.utc(moment.duration(c.count).asMilliseconds()).format("HH:mm:ss.S");
  			return c;
  		});

  		//console.log(this.records);
  	})
  
  }

  deleteLog(id:string){
  	this._logsService.deleteLog(id);
  }

  ResumeLog(id:string){
  	//const _rec=this._logsService.getLogById(id);

  	this._data.changeMessage(id);
  	//this.resumeLogRecord.emit(id);
  	console.log(id);
  }

}
