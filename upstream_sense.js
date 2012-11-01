var Sense = require('./sense');
/*
Blocks the flow of electricity when upstream, mature salmon are present.
*/
var UpstreamSense = function(){
	Sense.call(this);
	this.name = "Upstream Sense";
};

module.exports = UpstreamSense;

UpstreamSense.prototype = new Sense();

UpstreamSense.prototype.constructor = UpstreamSense;

UpstreamSense.prototype.doesThisSalmonBlockPower = function(a_Salmon){
	return (a_Salmon.mature && !a_Salmon.downstream);
};