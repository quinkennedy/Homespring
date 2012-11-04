var Node = require('./rivernode');
/*
Very blocks mature salmon
*/
var Net = function(){
	Node.call(this, 'Net', false, false, false, false);
};

module.exports = Net;

Net.prototype = new Node('Net', false, false, false, false);

Net.prototype.constructor = Net;

Net.prototype.doesVeryBlockSalmon = function(a_Salmon){
	return a_Salmon.mature;
};