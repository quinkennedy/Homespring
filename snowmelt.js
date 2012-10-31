var Node = require('./rivernode');
/*
Creates a snowmelt at the end of each snow tick.
*/
var Snowmelt = function(){
	Node.call(this, 'Snowmelt', false, false, false, false);
};

module.exports = Snowmelt;

Snowmelt.prototype = new Node('Snowmelt', false, false, false, false);

Snowmelt.prototype.constructor = Snowmelt;

Snowmelt.prototype.postSnow = function(){
	this.snow = true;
};