var Node = require('./rivernode');
/*
Snowmelts take two turns to pass through.
*/
var Marshy = function(){
	Node.call(this, 'Marshy', false, false, false, false);
	this.snowtick = 0;
	this.maxSnowTick = 1;
};

module.exports = Marshy;

Marshy.prototype = new Node('Marshy', false, false, false, false);

Marshy.prototype.constructor = Marshy;

Marshy.prototype.postSnow = function(){
	if (this.snow && this.snowtick < this.maxSnowTick){
		this.snow = false;
		this.snowtick++;
	} else if (!this.snow){
		this.snowtick = 0;
	}
};