var Node = require('./rivernode');
/*
Blocks water, snowmelt and salmon when powered.
*/
var ForceField = function(){
	Node.call(this, 'Force Field', false, false, false, false);
};

module.exports = ForceField;

ForceField.prototype = new Node('Force Field', false, false, false, false);

ForceField.prototype.constructor = ForceField;

ForceField.prototype.preSnow = function(){
	this.blockSnow = this.hasPower();
};

ForceField.prototype.preWater = function(){
	this.blockWater = this.hasPower();
};

ForceField.prototype.preTickFishDown = function(){
	this.blockSalmon = this.hasPower();
};

ForceField.prototype.preTickFishUp = function(){
	this.blockSalmon = this.hasPower();
};