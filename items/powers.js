var Node = require('./rivernode');
/*
Generates power.
*/
var Powers = function(){
	Node.call(this, 'Powers', false, false, false, false);
	this.generatingPower = true;
};

module.exports = Powers;

Powers.prototype = new Node('Powers', false, false, false, false);

Powers.prototype.constructor = Powers;

Powers.prototype.tickPower = function(){
	this.generatingPower = true;
};