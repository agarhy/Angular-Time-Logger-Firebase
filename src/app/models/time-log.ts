export interface TimeLog {
	$id?:string,
	title:string,
	running:boolean,
	durations:[{
		time:number,
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
