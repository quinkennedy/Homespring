var Node = require('./rivernode');
/*
Eats young salmon.
TODO: the original documentation mentions that operations such as Bear should be performed during the misc step.
*/
var Bird = function(){
	Node.call(this, 'Bird', false, false, false, false);
};

module.exports = Bird;

Bird.prototype = new Node('Bird', false, false, false, false);

Bird.prototype.constructor = Bird;

Bird.prototype.shouldAddSalmon = function(a_Salmon){
	return a_Salmon.mature;
};