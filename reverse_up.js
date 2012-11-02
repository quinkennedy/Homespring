var Node = require('./rivernode');
/*
For each downstream salmon that arrived from the second child, move it to the
first child unless it is prevented from moving there.

NOTE:
I will be moving fish when they arrive, perhaps this should be done during the misc step?
*/
var ReverseUp = function(){
	Node.call(this, 'Reverse Up', false, false, false, false);
};

module.exports = ReverseUp;

ReverseUp.prototype = new Node('Reverse Up', false, false, false, false);

ReverseUp.prototype.constructor = ReverseUp;

ReverseUp.prototype.addSalmon = function(a_Salmon, a_Source){
	if (this.upstream.length <= 1){
		//act normally if we only have one child
		Node.addSalmon.apply(this, a_Salmon, a_Source);
	} else {
		//we have at least 2 children
		if (this.shouldAddSalmon(a_Salmon, a_Source)){
			if (!this.blockSalmon &&
				a_Source === this.upstream[1] && 
				!this.upstream[0].doesVeryBlockSalmon(a_Salmon)){
				//move to first child
				this.upstream[0].addSalmon(a_Salmon, a_Source);
			} else {
				//keep it as normal
				this.salmon.push(a_Salmon);
			}
		}
	}
};