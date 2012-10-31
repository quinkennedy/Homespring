var Node = require('./rivernode');
/*
Young salmon take two turns to pass through.
*/
var Rapids = function(){
	Node.call(this, 'Rapids', false, false, false, false);
};

module.exports = Rapids;

Rapids.prototype = new Node('Rapids', false, false, false, false);

Rapids.prototype.constructor = Rapids;