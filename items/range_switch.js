var Node = require('./rivernode');
/*
Blocks electricity unless mature salmon are here or upstream.
*/
var RangeSwitch = function(){
	Node.call(this, 'Range Switch', false, false, false, false);
};

module.exports = RangeSwitch;

RangeSwitch.prototype = new Node('Range Switch', false, false, false, false);

RangeSwitch.prototype.constructor = RangeSwitch;

RangeSwitch.prototype.hasPower = function(){
	this.blockPower = !this.containsSalmon(true, undefined);
	return this.implHasPower();
};