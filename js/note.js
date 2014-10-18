function Note(bodyPosX, bodyLenX, bodyPosY, bodyLenY, note) {
	var secX = 0.85 * bodyLenX;	// width of the bottom section of the tuner
	
	/*
	 Draw the section of the canvas which will display the note alphabet
	*/
	var noteX = 0.6 * secX;	// width of the note screen => 0.4 * secX will display frequency value
	var startX = bodyPosX + (bodyLenX - secX)/2;
	var noteY = 0.5 * bodyLenY;	// assumption => the dial section of the tuner will take 0.3*bodyLenY + 0.1*bodyLenY (for top and bottom padding)
	var startY = bodyPosY + 0.4*bodyLenY;

	this.container = function () {
		var lenX = noteX;
		var lenY = noteY;
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
	};

	/*
	 Draw the note alphabet itself
	*/
	var posX = noteX/2 + startX;
	var posY = noteY/2 + startY;
	this.draw = function(note) {
		this.container();
		var x = posX;
		var y = posY;
		
		context.beginPath();
		context.font = '200pt Calibri';
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.fillStyle = 'blue';
		context.fillText(note, x, y);
		context.closePath();
	}
}
