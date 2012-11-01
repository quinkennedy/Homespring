var Sense = require('./sense');
/*
Blocks electricity when young salmon are present.
*/
var YoungSense = function(){
	Sense.call(this);
	this.name = "Young Sense";
};

module.exports = YoungSense;

YoungSense.prototype = new Sense();

YoungSense.prototype.constructor = YoungSense;

YoungSense.prototype.doesThisSalmonBlockPower = function(a_Salmon){
	return !a_Salmon.mature;
};