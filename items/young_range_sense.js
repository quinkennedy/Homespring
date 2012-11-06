var Node = require('./rivernode');
/*
Blocks electricity when young salmon are here or upstream.
*/
var YoungRangeSense = function(){
	Node.call(this, 'Young Range Sense', false, false, false, false);
};

module.exports = YoungRangeSense;

YoungRangeSense.prototype = new Node('Young Range Sense', false, false, false, false);

YoungRangeSense.prototype.constructor = YoungRangeSense;

YoungRangeSense.prototype.hasPower = function(){
	this.blockPower = this.containsSalmon(false, undefined);
	return this.implHasPower();
};