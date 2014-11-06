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
	note.draw('', '', '');

	timerId = setTimeout(updateDisplay, 1)
}

function updateDisplay() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status==200) {
			var data = JSON.parse(xmlhttp.responseText);
			var _note = String.fromCharCode(parseInt(data.note));
			var _observed_freq = data.observed_frequency;
			var _octave = data.octave;
			var _accidental = data.accidental;
			var _target_freq = data.target_frequency;
			

			var _low = getLower(_target_freq);
			var _high = getHigher(_target_freq);
			var _pitch = getPitch(_target_freq, _observed_freq);
			var _freq = getFreqPos(_low, _high, _observed_freq);
			var _accUnicode = getAccCode(_accidental);
			redraw(_pitch, _note, _octave, _accUnicode, _freq);
			timerId = setTimeout(updateDisplay, 1);
		}
	}
	xmlhttp.open("GET", "http://localhost/data.json", true);
	xmlhttp.send();
}

function redraw(_pitch, _note, _octave, _accUnicode, _freq) {
	clear();
	tuner.draw();
	dial.draw();
	scale.draw();
	pitch.draw(_pitch);
	freq.updatePos(_freq);
	freq.draw();
	note.draw(_note, _octave, _accUnicode);
}

function clear() {
	context.beginPath();
	context.clearRect(0, 0, window.innerWidth, window.innerHeight);
	context.closePath();
}

function getLower(midBand) {
	return midBand / Math.pow(2, 1/12);
}

function getHigher(midBand) {
	return midBand * Math.pow(2, 1/12);
}

function getPitch(target, spot) {
	if(spot > target) {
		return "sharp";
	} else if(spot < target) {
		return "flat";
	} else {
		return false;
	}
}

// returns a ratio representing how higher it is than the lower frequency, in relation to higher one
function getFreqPos(low, high, curr) {
	var total = high - low;
	var pos = curr - low;
	var resolution = Math.pow(1/100, Math.pow(2, 1/12))
	var ratio = pos/total;
	var upperLimit = 0.5 + resolution;
	var lowerLimit = 0.5 - resolution;
	if(lowerLimit <= ratio <= upperLimit) {
		ratio = 0.5;
	}
	return ratio;
}

function getAccCode(num) {
	if(num == "-1") { // flat
		return "\u266D";
	}
	if(num == "1") {	// sharp
		return "\u266F";
	}
	return "";
}
