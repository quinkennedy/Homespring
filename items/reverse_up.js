var Node = require('./rivernode');
/*
For each downstream salmon that arrived from the second child, move it to the
first child unless it is prevented from moving there.

NOTE:
I am moving fish during the misc step. This was done based on add.hs
This now also changes the fish to an upstream fish, Was done based on add.hs
*/
var ReverseUp = function(){
	Node.call(this, 'Reverse Up', false, false, false, false);
};

module.exports = ReverseUp;

ReverseUp.prototype = new Node('Reverse Up', false, false, false, false);

ReverseUp.prototype.constructor = ReverseUp;

ReverseUp.prototype.postAddSalmon = function(a_Salmon, a_Source){
	if (a_Salmon.downstream && this.upstream.length > 1){
		a_Salmon.needs_processing = true;
		a_Salmon.comes_from = a_Source;
	}
};

ReverseUp.prototype.tickMisc = function(){
	for (var i = this.salmon.length - 1; i >= 0; i--) {
		var currSalmon = this.salmon[i];
		if (currSalmon.needs_processing){
			var salmonSource = currSalmon.comes_from;
			currSalmon.comes_from = undefined;
			currSalmon.needs_processing = false;
			var newSalmon = new Salmon(currSalmon.name, currSalmon.mature, false);
			if (!this.blockSalmon && 
				salmonSource === this.upstream[1] && 
				!this.upstream[0].doesVeryBlockSalmon(newSalmon)){
				//move to first child
				this.upstream[0].addSalmon(newSalmon, salmonSource);
				//remove from me
				this.salmon.splice(i, 1);
			}
			//otherwise, keep it
		}
	};
};