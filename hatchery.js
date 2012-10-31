var Node = require('./rivernode');
/*
When powered, creates a mature, upstream salmon named “homeless”. Operates
during the fish tick hatch step.
*/
var Hatchery = function(){
	Node.call(this, 'Hatchery', false, false, false, false);
};

module.exports = Hatchery;

Hatchery.prototype = new Node('Hatchery', false, false, false, false);

Hatchery.prototype.constructor = Hatchery;

Hatchery.prototype.tickFishHatch = function(){
	if (this.hasPower()){
		this.salmon.push(new Salmon('homeless', true, false));
	}
};