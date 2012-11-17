var Node = require('./rivernode');
/*
Eats mature salmon.
TODO: the original documentation mentions that operations such as Bear should be performed during the misc step.
*/
var Bear = function(){
	Node.call(this, 'Bear', false, false, false, false);
};

module.exports = Bear;

Bear.prototype = new Node('Bear', false, false, false, false);

Bear.prototype.constructor = Bear;

Bear.prototype.shouldAddSalmon = function(a_Salmon){
	return !a_Salmon.mature;
};