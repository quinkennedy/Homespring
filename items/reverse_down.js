var Node = require('./rivernode');
/*
For each downstream salmon that arrived from the first child, move it to the
second child unless it is prevented from moving there.

NOTE:
I will be moving fish when they arrive, perhaps this should be done during the misc step?
This now also changes the fish to an upstream fish, Was done based on add.hs

TODO:
change this to happen during the misc step. Otherwise, Child 1 does its down tick, and those get moved to
the second child, then Child 2 does its down tick and those stay here... I don't think that was the intended
operation.
*/
var ReverseDown = function(){
	Node.call(this, 'Reverse Down', false, false, false, false);
};

module.exports = ReverseDown;

ReverseDown.prototype = new Node('Reverse Down', false, false, false, false);

ReverseDown.prototype.constructor = ReverseDown;

ReverseDown.prototype.addSalmon = function(a_Salmon, a_Source){
	if (this.upstream.length <= 1){
		//act normally if we only have one child
		Node.addSalmon.apply(this, a_Salmon, a_Source);
	} else {
		//we have at least 2 children
		if (this.shouldAddSalmon(a_Salmon, a_Source)){
			var newSalmon = new Salmon(a_Salmon.name, a_Salmon.mature, false);
			if (!this.blockSalmon && 
				a_Source === this.upstream[0] && 
				!this.upstream[1].doesVeryBlockSalmon(newSalmon)){
				//move to second child
				this.upstream[1].addSalmon(newSalmon, a_Source);
			} else {
				//keep it as normal
				this.salmon.push(a_Salmon);
			}
		}
	}
};