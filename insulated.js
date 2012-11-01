var Node = require('./rivernode');
/*
Blocks power.
*/
var Insulated = function(){
	Node.call(this, 'Insulated', false, false, false, false);
	this.blocksPower = true;
};

module.exports = Insulated;

Insulated.prototype = new Node('Insulated', false, false, false, false);

Insulated.prototype.constructor = Insulated;
