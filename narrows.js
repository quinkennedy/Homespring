var Node = require('./rivernode');
/*
Very blocks salmon if another salmon is present.
*/
var Narrows = function(){
	Node.call(this, 'Narrows', false, false, false, false);
};

module.exports = Narrows;

Narrows.prototype = new Node('Narrows', false, false, false, false);

Narrows.prototype.constructor = Narrows;

Narrows.prototype.doesVeryBlockSalmon = function(a_Salmon){
	return this.salmon.length > 0;
};