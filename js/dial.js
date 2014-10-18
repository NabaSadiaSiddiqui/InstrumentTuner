function Dial(bodyPosX, bodyLenX, bodyPosY, bodyLenY) {
	this.dialX = 0.85 * bodyLenX;
	this.startX = bodyPosX + (bodyLenX - this.dialX)/2;
	this.dialY = 0.3 * bodyLenY;
	// assumption => the note section of the tuner will take 0.5*bodyLenY
	this.startY = bodyPosY + (0.1 * bodyLenY)/2;
	this.radius = 30;

	this.draw = function() {
		context.beginPath();
		this.drawHelper();
		context.fillStyle = '#FFFFCC';
		context.strokeStyle = '#A9BCF5';
		context.lineWidth = 5;
		context.stroke();
		context.fill();
		context.closePath();
	}

	this.drawHelper = function() {
		context.moveTo(this.startX + this.radius, this.startY);
		context.lineTo(this.startX + this.dialX - this.radius, this.startY);
		context.arcTo(this.startX + this.dialX, this.startY, this.startX + this.dialX, this.startY + this.radius, this.radius);
		context.lineTo(this.startX + this.dialX, this.startY + this.dialY);
		context.lineTo(this.startX, this.startY + this.dialY);
		context.lineTo(this.startX, this.startY + this.radius);
		context.arcTo(this.startX, this.startY, this.startX + this.radius, this.startY, this.radius);
	}
}
