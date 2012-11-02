var Node = require('./rivernode');
/*
If destroyed by snowmelt, blocks snowmelt and water and very blocks salmon.
*/
var Bridge = function(){
	Node.call(this, 'Bridge', false, false, false, false);
};

module.exports = Bridge;

Bridge.prototype = new Node('Bridge', false, false, false, false);

Bridge.prototype.constructor = Bridge;

Bridge.prototype.postSnow = function(){
	if (this.snow){
		this.destroyed = true;
		this.blockSnow = true;
		this.blockWater = true;
		this.blockSalmonVery = true;
	}
};