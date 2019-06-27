function getTimeDate(){
	let dates = new Date()
	let years = dates.getFullYear();
	let months = dates.getMonth()+1;
	let dateday = dates.getDate();
	return years+"-"+months+"-"+dateday;
}

function getFullTime(){
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth()+1;
	let datex = date.getDate();
	let hour = date.getHours();
	let min = date.getMinutes();
	let sec = date.getSeconds();
	return year+"-"+month+"-"+datex+" "+hour+":"+min+":"+sec
}


module.exports={
	getFullTime,getTimeDate
}