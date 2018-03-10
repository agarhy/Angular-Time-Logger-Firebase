export interface TimeLog {
	$id?:string,
	title:string,
	running:boolean,
	durations:[{
		start:number,
		stop:number
	}],
	count:string,
	countMilliseconds:number,
	time:{
		mseconds:string,
		seconds:string,
		minutes:string,
		hours:string
	},
	createdAt:number,
	updatedAt:number
	
}

export var INITIAL_TIMELOG:TimeLog = {
	
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

}