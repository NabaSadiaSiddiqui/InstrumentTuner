/*	
 Draws the words "flat" and "sharp" on the dial
 if pitch == false => the words are in grey
 else => the specified pitch is green
*/
function Pitch(bodyPosX, bodyLenX, bodyPosY, bodyLenY) {
	this.flat = 'flat';
	this.sharp = 'sharp';
	this.bodyPosX = bodyPosX;
	this.bodyPosY = bodyPosY;
	// y position of both pitch types
	this.posY = 0.4 * bodyLenY + bodyPosY;
	// size of each of the portions of the dial for flat and sharp pitch
	this.boxLenX = bodyLenX/2;
	this.boxLenY = bodyLenY/2;	
	// x position of both pitch types
	var textWidthFlat = context.measureText(this.flat).width;
	var textWidthSharp = context.measureText(this.sharp).width;
	this.posXflat = (this.boxLenX-textWidthFlat)/2 + this.bodyPosX/2;
	this.posXsharp = (this.boxLenX-textWidthSharp)/2 + this.bodyPosX/2 + this.boxLenX;

	this.draw = function(pitch) {
		context.beginPath();
		context.font = 'italic 50pt Calibri';
		context.fillStyle = 'grey';
	
		if(pitch == false) {
			context.fillText(this.flat, this.posXflat, this.posY);
			context.fillText(this.sharp, this.posXsharp, this.posY);
			context.closePath();
		} else {
			if(pitch == 'flat') {
				context.fillText(this.sharp, this.posXsharp, this.posY);
				context.fillStyle = 'green';
				context.fillText(this.flat, this.posXflat, this.posY);
				context.closePath();
			} else {
				context.fillText(this.flat, this.posXflat, this.posY);
				context.fillStyle = 'green';
				context.fillText(this.sharp, this.posXsharp, this.posY);
				context.closePath();
			}
		}
	}
}
