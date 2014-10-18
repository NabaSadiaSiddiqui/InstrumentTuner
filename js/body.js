function Body(c_height, c_width) {
	this.rectX = 0.9 * c_width;
	this.startX = (c_width - this.rectX)/2;
	this.rectY = 0.9 * c_height;
	this.startY = (c_height - this.rectY)/2;
	this.cornerRadius = 30;

	this.draw = function() {
		context.save();
		context.beginPath();
		this.drawHelper();
		context.fillStyle = '#848484';
		context.shadowColor = 'white';
		context.shadowBlur = 35;
		context.shadowOffsetX = 7;
		context.shadowOffsetY = -7
		context.fill();
		context.closePath();
		context.restore();
	}
	//drawNote(context, startX, rectX, startY, rectY, 'B');

	this.drawHelper = function () {
		var startX = this.startX;
		var startY = this.startY;
		var rectX = this.rectX;
		var rectY = this.rectY;
		var cornerRadius = this.cornerRadius;
		context.moveTo(startX + cornerRadius, startY);
		context.lineTo(startX + rectX - cornerRadius, startY);
		context.arcTo(startX + rectX, startY, startX + rectX, startY + cornerRadius, cornerRadius);
		context.lineTo(startX + rectX, startY + rectY - cornerRadius);
		context.arcTo(startX + rectX, startY + rectY, startX + rectX - cornerRadius, startY + rectY, cornerRadius);
		context.lineTo(startX + cornerRadius, startY + rectY);
		context.arcTo(startX, startY + rectY, startX, startY + rectY - cornerRadius, cornerRadius);
		context.lineTo(startX, startY + cornerRadius);
		context.arcTo(startX, startY, startX + cornerRadius, startY, cornerRadius);
	}
}
