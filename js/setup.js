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

	var context = canvas.getContext("2d");
	drawTunerBody(context, c_h, c_w);
}

function drawTunerBody(context, c_height, c_width) {
	var rectX = 0.9 * c_width;
	var startX = (c_width - rectX)/2;
	var rectY = 0.9 * c_height;
	var startY = (c_height - rectY)/2;
	var cornerRadius = 30;

	context.save();
	context.beginPath();
	context.moveTo(startX + cornerRadius, startY);
	context.lineTo(startX + rectX - cornerRadius, startY);
	context.arcTo(startX + rectX, startY, startX + rectX, startY + cornerRadius, cornerRadius);
	context.lineTo(startX + rectX, startY + rectY - cornerRadius);
	context.arcTo(startX + rectX, startY + rectY, startX + rectX - cornerRadius, startY + rectY, cornerRadius);
	context.lineTo(startX + cornerRadius, startY + rectY);
	context.arcTo(startX, startY + rectY, startX, startY + rectY - cornerRadius, cornerRadius);
	context.lineTo(startX, startY + cornerRadius);
	context.arcTo(startX, startY, startX + cornerRadius, startY, cornerRadius);
	context.fillStyle = '#848484';
	context.shadowColor = 'white';
	context.shadowBlur = 35;
	context.shadowOffsetX = 7;
	context.shadowOffsetY = -7
	context.fill();
	context.closePath();
	context.restore();

	drawDial(context, startX, rectX, startY, rectY);
	drawNote(context, startX, rectX, startY, rectY, 'B');
}

function drawDial(context, bodyPosX, bodyLenX, bodyPosY, bodyLenY) {
	var dialX = 0.85 * bodyLenX;
	var startX = bodyPosX + (bodyLenX - dialX)/2;

	// lenY = 0.3 * bodyLenY
	// paddingYtop = paddingYbottom = 0.1*bodyLenY/2
	var dialY = 0.3 * bodyLenY;
	// assumption => the note section of the tuner will take 0.5*bodyLenY
	var startY = bodyPosY + (0.1 * bodyLenY)/2;
	var radius = 30;

	context.beginPath();
	context.moveTo(startX + radius, startY);
	context.lineTo(startX + dialX - radius, startY);
	context.arcTo(startX + dialX, startY, startX + dialX, startY + radius, radius);
	context.lineTo(startX + dialX, startY + dialY);
	context.lineTo(startX, startY + dialY);
	context.lineTo(startX, startY + radius);
	context.arcTo(startX, startY, startX + radius, startY, radius);
	context.fillStyle = '#FFFFCC';
	context.strokeStyle = '#A9BCF5';
	context.lineWidth = 5;
	context.stroke();
	context.fill();
	context.closePath();

	drawScale(context, startX, dialX, startY, dialY);
}

function drawScale(context, bodyPosX, bodyLenX, bodyPosY, bodyLenY) {
	var numNeedles = 20;
	var dist = bodyLenX/numNeedles; //distance between each needle
	var len = 0.3 * bodyLenY;	// vertical height of each needle

	var posX = bodyPosX;
	var posY = bodyPosY + bodyLenY;
	for(var i=0; i<=numNeedles; i++) {
		context.beginPath();
		var y2;
		if(i % 5 == 0 && i !=0 && i!=numNeedles) {
			y2 = (posY-len)*0.9;
			context.lineWidth = 5;
		} else {
			y2 = posY - len;
			context.lineWidth = 2;
		}
		context.lineCap = 'round';
		context.moveTo(posX, posY);
		context.lineTo(posX, y2);
		context.strokeStyle = 'black';
		context.stroke();
		context.closePath();
		posX += dist;
	}
	
	drawPitch(context, bodyPosX, bodyLenX, bodyPosY, bodyLenY, false);
	drawFreq(context, bodyPosX, bodyLenX, bodyPosY, bodyLenY);
}

/*	
 Draws the words "flat" and "sharp" on the dial
 if pitch == false => the words are in grey
 else => the specified pitch is green
*/
function drawPitch(context, bodyPosX, bodyLenX, bodyPosY, bodyLenY, pitch) {
	var flat = 'flat';
	var sharp = 'sharp';

	// size of each of the portions of the dial for flat and sharp pitch
	var boxLenX = bodyLenX/2;
	var boxLenY = bodyLenY/2;
	
	context.beginPath();
	context.font = 'italic 50pt Calibri';
	context.fillStyle = 'grey';
	// y position of both pitch types
	var posY = 0.4 * bodyLenY + bodyPosY;
	// x position of both pitch types
	var textWidthFlat = context.measureText(flat).width;
	var textWidthSharp = context.measureText(sharp).width;
	var posXflat = (boxLenX-textWidthFlat)/2 + bodyPosX;
	var posXsharp = (boxLenX-textWidthSharp)/2 + bodyPosX + boxLenX;

	if(pitch == false) {
		context.fillText(flat, posXflat, posY);
		context.fillText(sharp, posXsharp, posY);
		context.closePath();
	} else {
		if(pitch == 'flat') {
			context.fillText(sharp, posXsharp, posY);
			context.fillStyle = 'red';
			context.fillText(flat, posXflat, posY);
			context.closePath();
		} else {
			context.fillText(flat, posXflat, posY);
			context.fillStyle = 'green';
			context.fillText(sharp, posXsharp, posY);
			context.closePath();
		}
	}
}

/* Draws the position of the needle at the frequency being played at */
function drawFreq(context, bodyPosX, bodyLenX, bodyPosY, bodyLenY) {
	var posYstart = bodyPosY;
	var posYend = bodyPosY + bodyLenY;
	// POSITION OF THE NEEDLE
	var posX = bodyPosX + bodyLenX/2;

	context.save();
	context.beginPath();
	context.moveTo(posX, posYstart);
	context.lineTo(posX, posYend);
	context.lineWidth = 3;
	context.shadowColor = '#999';
	context.shadowBlur = 15;
	context.shadowOffsetX = 3;
	context.shadowOffsetY = 3;
	context.fill();
	context.strokeStyle = 'red';
	context.stroke();
	context.closePath();
	context.restore();
}

function drawNote(context, bodyPosX, bodyLenX, bodyPosY, bodyLenY, note) {
	var secX = 0.85 * bodyLenX;	// width of the bottom section of the tuner
	
	/*
	 Draw the section of the canvas which will display the note alphabet
	*/
	var noteX = 0.6 * secX;	// width of the note screen => 0.4 * secX will display frequency value
	var startX = bodyPosX + (bodyLenX - secX)/2;
	var noteY = 0.5 * bodyLenY;	// assumption => the dial section of the tuner will take 0.3*bodyLenY + 0.1*bodyLenY (for top and bottom padding)
	var startY = bodyPosY + 0.4*bodyLenY;
	drawNoteDisplay(context, startX, startY, noteX, noteY);

	/*
	 Draw the note alphabet itself
	*/
	var posX = noteX/2 + startX;
	var posY = noteY/2 + startY;
	drawNoteAlpha(context, posX, posY, note);
}

function drawNoteDisplay(context, startX, startY, lenX, lenY) {
	var cornerRadius = 35;

	context.beginPath();
	context.moveTo(startX + cornerRadius, startY);
	context.lineTo(startX + lenX - cornerRadius, startY);
	context.arcTo(startX + lenX, startY, startX + lenX, startY + cornerRadius, cornerRadius);
	context.lineTo(startX + lenX, startY + lenY - cornerRadius);
	context.arcTo(startX + lenX, startY + lenY, startX + lenX - cornerRadius, startY + lenY, cornerRadius);
	context.lineTo(startX + cornerRadius, startY + lenY);
	context.arcTo(startX, startY + lenY, startX, startY + lenY - cornerRadius, cornerRadius);
	context.lineTo(startX, startY + cornerRadius);
	context.arcTo(startX, startY, startX + cornerRadius, startY, cornerRadius);
	context.fillStyle = '#FFFFCC';
	context.strokeStyle = '#A9BCF5';
	context.lineWidth = 5;
	context.stroke();
	context.fill();
	context.closePath();
}

function drawNoteAlpha(context, x, y, note) {
	context.beginPath();
	context.font = '200pt Calibri';
	context.textAlign = 'center';
	context.textBaseline = 'middle';
	context.fillStyle = 'blue';
	context.fillText(note, x, y);
	context.closePath();
}
