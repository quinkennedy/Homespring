var Node = require('./rivernode');
/*
Makes all salmon mature.
*/
var Time = function(){
	Node.call(this, 'Time', false, false, false, false);
};

module.exports = Time;

Time.prototype = new Node('Time', false, false, false, false);

Time.prototype.constructor = Time;

Time.prototype.shouldAddSalmon = function(a_Salmon){
	a_Salmon.mature = true;
	return true;
};