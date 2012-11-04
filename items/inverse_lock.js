var Node = require('./rivernode');
/*
Very blocks downstream salmon and blocks snowmelt when not powered.

NOTE:
perhaps they mean it blocks downstream salmon always 
and blocks snowmelt only when not powered?
*/
var InverseLock = function(){
	Node.call(this, 'Inverse Lock', false, false, false, false);
};

module.exports = InverseLock;

InverseLock.prototype = new Node('Inverse Lock', false, false, false, false);

InverseLock.prototype.constructor = InverseLock;

InverseLock.prototype.doesVeryBlockSalmon = function(a_Salmon){
	return (a_Salmon.downstream && !this.hasPower());
};

InverseLock.prototype.preSnow = function(){
	this.blockSnow = !this.hasPower();
};