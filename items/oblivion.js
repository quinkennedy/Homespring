var Node = require('./rivernode');
/*
When powered, changes the name of each salmon to “”. Can be destroyed by
snowmelt.
*/
var Oblivion = function(){
	Node.call(this, 'Oblivion', false, false, false, false);
};

module.exports = Oblivion;

Oblivion.prototype = new Node('Oblivion', false, false, false, false);

Oblivion.prototype.constructor = Oblivion;

Oblivion.prototype.postSnow = function(){
	if (this.snow){
		this.destroyed = true;
	}
};

Oblivion.prototype.shouldAddSalmon = function(a_Salmon){
	if (!this.destroyed && this.hasPower()){
		a_Salmon.name = '';
	}
	return true;
};