var Node = require('./rivernode');
/*
Very blocks young salmon.
*/
var Current = function(){
	Node.call(this, 'Current', false, false, false, false);
};

module.exports = Current;

Current.prototype = new Node('Current', false, false, false, false);

Current.prototype.constructor = Current;

Current.prototype.doesVeryBlockSalmon = function(a_Salmon){
	return !a_Salmon.mature;
};