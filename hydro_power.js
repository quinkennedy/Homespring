var Node = require('./rivernode');
/*
Creates electricity when watered. Can be destroyed by snowmelt.
*/
var HydroPower = function(){
	Node.call(this, 'Hydro Power', false, false, false, false);
};

module.exports = HydroPower;

HydroPower.prototype = new Node('Hydro Power', false, false, false, false);

HydroPower.prototype.constructor = HydroPower;

HydroPower.prototype.tickPower = function(){
	this.generatingPower = (!this.destroyed && this.water);
};

HydroPower.prototype.postSnow = function(){
	if (this.snow){
		this.destroyed = true
	}
};