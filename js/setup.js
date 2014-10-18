function init() {
	var height = window.innerHeight;
	var width = window.innerWidth;

	var canvas = document.getElementById("tuner");
	$(canvas).width(0.7*width);


	// set height and width of the canvas
	var c_h = height;
	var c_w = 0.8 * width;

	canvas.height = c_h;
	canvas.width = c_w;

	context = canvas.getContext("2d");

	var tuner = new Body(c_h, c_w);
	tuner.draw();
	
	var dial = new Dial(tuner.startX, tuner.rectX, tuner.startY, tuner.rectY);
	dial.draw();

	var scale = new Scale(dial.startX, dial.dialX, dial.startY, dial.dialY);
	scale.draw();

	var pitch = new Pitch(dial.startX, dial.dialX, dial.startY, dial.dialY);
	pitch.draw(false);

	var freq = new Freq(dial.startX, dial.dialX, dial.startY, dial.dialY);
	freq.draw();
	
	var note = new Note(tuner.startX, tuner.rectX, tuner.startY, tuner.rectY);
	note.draw('B');
}
