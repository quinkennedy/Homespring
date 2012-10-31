var Node = require('./rivernode');
/*
Creates electricity when watered. Can be destroyed by snowmelt.
*/
var Hydro = function(){
	Node.call(this, 'Hydro', false, false, false, false);
};

module.exports = Hydro;

Hydro.prototype = new Node('Hydro', false, false, false, false);

Hydro.prototype.constructor = Hydro;

Hydro.prototype.tickPower = function(){
	if (!this.destroyed && this.water){
		this.generatingPower = true;
	}
};

Hydro.prototype.postSnow = function(){
	if (this.snow){
		this.destroyed = true
	}
};