var Node = require('./rivernode');
/*
Blocks electricity when mature salmon are present.
*/
var Sense = function(){
	Node.call(this, 'Sense', false, false, false, false);
};

module.exports = Sense;

Sense.prototype = new Node('Sense', false, false, false, false);

Sense.prototype.constructor = Sense;

Sense.prototype.shouldAddSalmon = function(a_Salmon){
	this.blockPower |= this.doesThisSalmonBlockPower(a_Salmon);
	return true;
};

Sense.prototype.doesThisSalmonBlockPower = function(a_Salmon){
	return a_Salmon.mature;
};

Sense.prototype.postTickFishDown = function(){
	this.evalElectricity();
};

Sense.prototype.postTickFishUp = function(){
	this.evalElectricity();
};

Sense.prototype.evalElectricity = function(){
	this.blockPower = false;
	for (var i = this.salmon.length - 1; i >= 0 && !this.blockPower; i--) {
		this.blockPower |= this.doesThisSalmonBlockPower(this.salmon[i]);
	};
};