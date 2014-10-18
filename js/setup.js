function init() {
	var height = window.innerHeight;
	var width = window.innerWidth;

	var canvas = document.getElementById("tuner");
	$(canvas).width(0.7*width);


	// set height and width of the canvas
	c_h = height;
	c_w = 0.8 * width;

	canvas.height = c_h;
	canvas.width = c_w;

	context = canvas.getContext("2d");

	tuner = new Body(c_h, c_w);
	tuner.draw();
	
	dial = new Dial(tuner.startX, tuner.rectX, tuner.startY, tuner.rectY);
	dial.draw();

	scale = new Scale(dial.startX, dial.dialX, dial.startY, dial.dialY);
	scale.draw();

	pitch = new Pitch(dial.startX, dial.dialX, dial.startY, dial.dialY);
	pitch.draw(false);

	freq = new Freq(dial.startX, dial.dialX, dial.startY, dial.dialY);
	freq.draw();
	
	note = new Note(tuner.startX, tuner.rectX, tuner.startY, tuner.rectY);
	note.draw('B');

	timerId = setTimeout(updateDisplay, 1)
}

function updateDisplay() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status==200) {
			var data = JSON.parse(xmlhttp.responseText);
			var _pitch = data.pitch;
			var _note = data.note;
			redraw(_pitch, _note);
			timerId = setTimeout(updateDisplay, 1000);
		}
	}
	xmlhttp.open("GET", "http://localhost/data.json", true);
	xmlhttp.send();
}

function redraw(_pitch, _note) {
	clear();
	tuner.draw();
	dial.draw();
	scale.draw();
	pitch.draw(_pitch);
	freq.draw();
	note.draw(_note);
}

function clear() {
	context.beginPath();
	context.clearRect(0, 0, window.innerWidth, window.innerHeight);
	context.closePath();
}
