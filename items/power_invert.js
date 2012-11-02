var Node = require('./rivernode');
/*
This node is powered if and only if none of its children are powered. Can be
destroyed by snowmelt.
*/
var PowerInvert = function(){
	Node.call(this, 'Power Invert', false, false, false, false);
};

module.exports = PowerInvert;

PowerInvert.prototype = new Node('Power Invert', false, false, false, false);

PowerInvert.prototype.constructor = PowerInvert;

PowerInvert.prototype.postSnow = function(){
	this.destroyed |= this.snow;
};

PowerInvert.prototype.hasPower = function(){
	//destroyed & hasPower = hasPower
	//destroyed & !hasPower = !hasPower
	//!destroyed & hasPower = !hasPower
	//!destroyed & !hasPower = hasPower
	return !(this.destroyed ^ this.implHasPower());
};