var Node = require('./rivernode');
/*
Mature salmon take two turns to pass through.
*/
var Shallows = function(){
	Node.call(this, 'Shallows', false, false, false, false);
};

module.exports = Shallows;

Shallows.prototype = new Node('Shallows', false, false, false, false);

Shallows.prototype.constructor = Shallows;
