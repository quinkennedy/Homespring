var Node = require('./rivernode');
/*
Blocks upstream salmon
*/
var Waterfall = function(){
	Node.call(this, 'Waterfall', false, false, false, false);
};

module.exports = Waterfall;

Waterfall.prototype = new Node('Waterfall', false, false, false, false);

Waterfall.prototype.constructor = Waterfall;

Waterfall.prototype.shouldMoveSalmon = function(a_Salmon){
	return a_Salmon.downstream;
};