function Scale(bodyPosX, bodyLenX, bodyPosY, bodyLenY) {
	this.numNeedles = 20;
	this.dist = bodyLenX/this.numNeedles; //distance between each needle
	this.len = 0.3 * bodyLenY;	// vertical height of each needle

	this.posX = bodyPosX;
	this.posY = bodyPosY + bodyLenY;

	this.draw = function() {
		var numNeedles = this.numNeedles;
		var dist = this.dist;
		var len = this.len;
		var posX = this.posX;
		var posY = this.posY;
		context.save();
		context.beginPath();
		for(var i=0; i<=numNeedles; i++) {
			var y2;
			
			context.lineWidth = 1;
			if(i%5 == 0) {
				y2 = (posY-len)*0.9;
				if(i==10) {
					context.lineWidth = 2;
				}
			} else {
				y2 = posY-len;
			}

			context.lineCap = 'round';
			context.moveTo(posX, posY);
			context.lineTo(posX, y2);
			context.strokeStyle = 'black';
			context.stroke();
			posX += dist;
		}
		context.closePath();
		context.restore();
	}
}

