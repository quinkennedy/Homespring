var Sense = require('./sense');
/*
Blocks the flow of electricity when downstream, mature salmon are present.
*/
var DownstreamSense = function(){
	Sense.call(this);
	this.name = "Downstream Sense";
};

module.exports = DownstreamSense;

DownstreamSense.prototype = new Sense();

DownstreamSense.prototype.constructor = DownstreamSense;

DownstreamSense.prototype.doesThisSalmonBlockPower = function(a_Salmon){
	return (a_Salmon.mature && a_Salmon.downstream);
};