var cnt = 0;
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var myDate = document.getElementById("date-picker");
var today = new Date();
myDate.value = today.toISOString().substr(0, 10);

function addHeading() {
	var heading = document.getElementsByName('title');
	document.getElementById('title').innerText = formatDate(heading[0].value);
}
function addEntry() {
	document.getElementsByClassName("warning-message-time")[0].style.display="none";
	document.getElementsByClassName("warning-message")[0].style.display="none";
	document.getElementsByClassName("labelTask")[0].style.display="none";
	document.getElementsByClassName("labelEndTime")[0].style.display="none";
	document.getElementsByClassName("labelStartTime")[0].style.display="none";



	var startTime = document.getElementsByName('startTime');
	var endTime = document.getElementsByName('endTime');
	var Entries = document.getElementById('Entries');
	
	var task = document.getElementsByName('task');
	var element = document.createElement('li');
	
	if(startTime[0].value == '' || endTime[0].value == '' || task[0].value == ''){

		if( startTime[0].value == '' ){
			document.getElementsByClassName("labelStartTime")[0].style.color="red";
			document.getElementsByClassName("labelStartTime")[0].style.display="inline-block";
		}
		if( endTime[0].value == '' ){
			document.getElementsByClassName("labelEndTime")[0].style.color="red";
			document.getElementsByClassName("labelEndTime")[0].style.display="inline-block";
		}
		if( task[0].value == '' ){
			document.getElementsByClassName("labelTask")[0].style.color="red";
			document.getElementsByClassName("labelTask")[0].style.display="inline-block";
		}
		document.getElementsByClassName("warning-message")[0].style.display="block";
		return;
	}
	
	if(startTime[0].value>endTime[0].value)
	{
		document.getElementsByClassName("labelEndTime")[0].style.color="red";
		document.getElementsByClassName("labelEndTime")[0].style.display="inline-block";
		document.getElementsByClassName("warning-message-time")[0].style.display="block";
		return;
	}

	element.setAttribute('draggable', 'true');
	element.innerHTML = '<b>[' + formatTime(startTime[0].value) + ' - ' + formatTime(endTime[0].value) + ']</b> <i>' + task[0].value + '</i>';
	startTime[0].value = endTime[0].value;
	endTime[0].value='';
	task[0].value = '';
	Entries.append(element);
}

function setStartTime() {
	var d = new Date();
	var startTime = document.getElementsByName('startTime');
	h = String(d.getHours());
	m = String(d.getMinutes());
	startTime[0].value = ((Number(h) < 10) ? '0' : '') + h + ':' + ((Number(m) < 10) ? '0':'' )+ m;
}

function setEndTime() {
	var d = new Date();
	var endTime = document.getElementsByName('endTime');
	h = String(d.getHours());
	m = String(d.getMinutes());
	endTime[0].value = ((Number(h) < 10) ? '0' : '') + h + ':' + ((Number(m) < 10) ? '0':'' )+ m;

}

function formatDate(date) {
	if(date == ''){
		var d = new Date();
		return monthNames[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
	}
	var [y,m,d] = date.split('-');
	return monthNames[Number(m-1)] + ' ' + d + ', ' + y;
}

function formatTime(t){
	var [h,m] = t.split(":");
	  return ((h%12<10 && h!=12)? '0' : '') + (h%12 + 12*(h%12==0)) +":"+m+ ((h>=12)? 'PM' : 'AM');
}

function copyData() {
	var data = document.getElementById('data').innerHTML;
	var datap = document.getElementById('data').innerText;
	// const elem = document.createElement('textarea');
	// document.body.appendChild(elem);
	// elem.value = data;
	// elem.select();
	// document.execCommand('copy');
	function listener(e){
		e.clipboardData.setData("text/html", data );
		e.clipboardData.setData("text/plain", datap);
		e.preventDefault();
	}
	document.addEventListener("copy", listener);
	document.execCommand("copy");
	document.removeEventListener("copy", listener);

}