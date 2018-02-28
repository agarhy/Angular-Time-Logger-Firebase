export interface TimeLog {
	$id?:string,
	title:string,
	running:boolean,
	durations:[{
		start:number,
		stop:number
	}],
	count:string,
	countMilliseconds:number
	
}