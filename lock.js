var Node = require('./rivernode');
/*
Very blocks downstream salmon and blocks snowmelt when powered.

NOTE:
perhaps they mean it blocks downstream salmon always 
and blocks snowmelt only when powered?
*/
var Lock = function(){
	Node.call(this, 'Lock', false, false, false, false);
};

module.exports = Lock;

Lock.prototype = new Node('Lock', false, false, false, false);

Lock.prototype.constructor = Lock;

Lock.prototype.doesVeryBlockSalmon = function(a_Salmon){
	return (a_Salmon.downstream && this.hasPower())
};

Lock.prototype.preSnow = function(){
	this.blockSnow = this.hasPower();
};