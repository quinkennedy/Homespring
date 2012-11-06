var Node = require('./rivernode');
/*
Blocks electricity when mature salmon are here or upstream.
*/
var RangeSense = function(){
	Node.call(this, 'Range Sense', false, false, false, false);
};

module.exports = RangeSense;

RangeSense.prototype = new Node('Range Sense', false, false, false, false);

RangeSense.prototype.constructor = RangeSense;

RangeSense.prototype.hasPower = function(){
	this.blockPower = this.containsSalmon(true, undefined);
	return this.implHasPower();
};