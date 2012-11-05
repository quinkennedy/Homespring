var Sense = require('./sense');
/*
Blocks electricity unless mature salmon are present.
*/
var Switch = function(){
	Sense.call(this);
	this.name = "Switch";
};

module.exports = Switch;

Switch.prototype = new Sense();

Switch.prototype.constructor = Switch;

Switch.prototype.shouldAddSalmon = function(a_Salmon){
	this.blockPower &= !this.doesThisSalmonAllowPower(a_Salmon);
	return true;
};

Switch.prototype.doesThisSalmonAllowPower = function(a_Salmon){
	return a_Salmon.mature;
};

Switch.prototype.evalElectricity = function(){
	this.blockPower = true;
	for (var i = this.salmon.length - 1; i >= 0 && this.blockPower; i--) {
		this.blockPower &= !this.doesThisSalmonAllowPower(this.salmon[i]);
	};
};