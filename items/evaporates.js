var Node = require('./rivernode');
/*
Blocks water and snowmelt when powered.
*/
var Evaporates = function(){
	Node.call(this, 'Evaporates', false, false, false, false);
};

module.exports = Evaporates;

Evaporates.prototype = new Node('Evaporates', false, false, false, false);

Evaporates.prototype.constructor = Evaporates;

Evaporates.prototype.preSnow = function(){
	this.blockSnow = this.hasPower();
};

Evaporates.prototype.preWater = function(){
	this.blockWater = this.hasPower();
};