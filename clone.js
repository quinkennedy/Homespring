var Node = require('./rivernode');
/*
For each salmon, create a young, downstream salmon with the same name.

NOTE:
doing this when salmon are added, perhaps it should be done during misc?
I will add the young salmon after the new salmon (to the head)
*/
var Clone = function(){
	Node.call(this, 'Clone', false, false, false, false);
	this.addingClone = false;
};

module.exports = Clone;

Clone.prototype = new Node('Clone', false, false, false, false);

Clone.prototype.constructor = Clone;

Clone.prototype.postAddSalmon = function(a_Salmon){
	if (!this.addingClone){
		this.addingClone = true;
		this.addSalmon(a_Salmon, this);
		this.addingClone = false;
	}
};