var Node = require('./rivernode');
/*
Young salmon take two turns to pass through.
*/
var Rapids = function(){
	Node.call(this, 'Rapids', false, false, false, false);
	this.salmonDelay = 1;
};

module.exports = Rapids;

Rapids.prototype = new Node('Rapids', false, false, false, false);

Rapids.prototype.constructor = Rapids;

Rapids.prototype.shouldAddSalmon = function(a_Salmon){
	a_Salmon.timer = 0;
	return true;
};

Rapids.prototype.shouldMoveSalmon = function(a_Salmon){
	return (a_Salmon.mature) || a_Salmon.timer >= this.salmonDelay;
};

Rapids.prototype.ageSalmon = function(a_bDownstream){
	for (var i = this.salmon.length - 1; i >= 0; i--) {
		if (this.salmon[i].downstream == a_bDownstream){
			this.salmon[i].timer++;
		}
	};
};

Rapids.prototype.postTickFishDown = function(){
	this.ageSalmon(true);
};

Rapids.prototype.postTickFishUp = function(){
	this.ageSalmon(false);
};
