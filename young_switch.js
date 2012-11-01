var Switch = require('./switch');
/*
Blocks electricity unless young salmon are present.
*/
var YoungSwitch = function(){
	Switch.call(this);
	this.name = "Young Switch";
};

module.exports = YoungSwitch;

YoungSwitch.prototype = new Switch();

YoungSwitch.prototype.constructor = YoungSwitch;

YoungSwitch.prototype.doesThisSalmonAllowPower = function(a_Salmon){
	return !a_Salmon.mature;
};