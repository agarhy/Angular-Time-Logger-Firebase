import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { TimeLog } from './time-log';
import * as moment from 'moment';

@Injectable()
export class LogsService {

 timeLogsCollection: AngularFirestoreCollection<TimeLog>;
 timelogs: Observable<TimeLog[]>;
 recordDoc: AngularFirestoreDocument<TimeLog>;
  uDocId:string;
  constructor(
  	private _angularFireStore: AngularFirestore
  ) { 
    this.uDocId=localStorage.getItem('userDocId');

    this.timeLogsCollection=this._angularFireStore.collection<TimeLog>('users/'+this.uDocId+'/timelogs', ref=>ref.orderBy('createdAt','desc'));
    console.log('users/'+this.uDocId+'/timelogs');
  }

  getLogs(){
    
    this.timelogs= this.timeLogsCollection.snapshotChanges().map(logs =>{
      return logs.map(record =>{
      	// console.log(record.payload.doc.data());
      	// console.log(record.payload.doc.data().createdAt);
      	var tt=record.payload.doc.data().createdAt;
      	console.log(moment.utc(moment.duration(tt).asMilliseconds()).format("MM/DD/YYYY"));

      	const $day=moment.utc(moment.duration(tt).asMilliseconds()).format("MM/DD/YYYY");
      const data = record.payload.doc.data() as TimeLog;
          const $id = record.payload.doc.id;
          return { $day,$id, ...data };
      })
    });
  	return this.timelogs;
  }

  addLog(log:TimeLog){
  	this.timeLogsCollection.add(log);
  }

  updateLog(log:TimeLog){

     this.recordDoc= this._angularFireStore.doc<TimeLog>('users/'+this.uDocId+'/timelogs/'+log.$id); 
     this.recordDoc.update(log);
  }

  deleteLog(_id:string){
    this.recordDoc= this._angularFireStore.doc<TimeLog>('users/'+this.uDocId+'/timelogs/'+_id);
  	this.recordDoc.delete();

  }

  getLogById(_id:string){
  	this.recordDoc= this._angularFireStore.doc<TimeLog>('users/'+this.uDocId+'/timelogs/'+_id);
  	return this.recordDoc.snapshotChanges().map(record =>{
        const data = record.payload.data() as TimeLog;
        const $id = record.payload.id;
        return { $id, ...data };
    });
  }
}

