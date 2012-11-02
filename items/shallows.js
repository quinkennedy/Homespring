var Node = require('./rivernode');
/*
Mature salmon take two turns to pass through.
*/
var Shallows = function(){
	Node.call(this, 'Shallows', false, false, false, false);
	this.salmonDelay = 1;
};

module.exports = Shallows;

Shallows.prototype = new Node('Shallows', false, false, false, false);

Shallows.prototype.constructor = Shallows;

Shallows.prototype.shouldAddSalmon = function(a_Salmon){
	a_Salmon.timer = 0;
	return true;
};

Shallows.prototype.shouldMoveSalmon = function(a_Salmon){
	return (!a_Salmon.mature) || a_Salmon.timer >= this.salmonDelay;
};

Shallows.prototype.ageSalmon = function(a_bDownstream){
	for (var i = this.salmon.length - 1; i >= 0; i--) {
		if (this.salmon[i].downstream == a_bDownstream){
			this.salmon[i].timer++;
		}
	};
};

Shallows.prototype.postTickFishDown = function(){
	this.ageSalmon(true);
};

Shallows.prototype.postTickFishUp = function(){
	this.ageSalmon(false);
};
