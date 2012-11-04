var Node = require('./rivernode');
/*
Very blocks salmon when powered.
*/
var Fear = function(){
	Node.call(this, 'Fear', false, false, false, false);
};

module.exports = Fear;

Fear.prototype = new Node('Fear', false, false, false, false);

Fear.prototype.constructor = Fear;

Fear.prototype.doesVeryBlockSalmon = function(a_Salmon){
	return this.hasPower();
};