var Node = require('./rivernode');
/*
Every
node whose name is not a reserved name is a spring: it creates water.
*/
var Spring = function(){
	Node.call(this, 'Spring', false, false, false, false);
	this.water = true;
};

module.exports = Spring;

Spring.prototype = new Node('Spring', false, false, false, false);

Spring.prototype.constructor = Spring;

Spring.prototype.postWater = function(){
	this.water = true;
};