var Node = require('./rivernode');
/*
50% chance of creating water each iteration
 */
var Gyser = function(){
	Node.call(this, 'Gyser', false, false, false, false);
	this.water;
	this.blockWater = true;
};

module.exports = Gyser;

Gyser.prototype = new Node('Gyser', false, false, false, false);

Gyser.prototype.constructor = Gyser;

Gyser.prototype.postWater = function(){
	this.water = (Math.random() >= .5);
};