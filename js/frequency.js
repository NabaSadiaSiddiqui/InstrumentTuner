/* Draws the position of the needle at the frequency being played at */
function Freq(bodyPosX, bodyLenX, bodyPosY, bodyLenY) {
	this.posYstart = bodyPosY;
	this.posYend = bodyPosY + bodyLenY;
	// POSITION OF THE NEEDLE
	this.posX = bodyPosX + bodyLenX/2;

	this.draw = function() {
		context.save();
		context.beginPath();
		context.moveTo(this.posX, this.posYstart);
		context.lineTo(this.posX, this.posYend);
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
}
