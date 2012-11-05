var Node = require('./rivernode');
/*
Very blocks salmon unless powered.
*/
var Pump = function(){
	Node.call(this, 'Pump', false, false, false, false);
};

module.exports = Pump;

Pump.prototype = new Node('Pump', false, false, false, false);

Pump.prototype.constructor = Pump;

Pump.prototype.doesVeryBlockSalmon = function(a_Salmon){
	return !this.hasPower();
};