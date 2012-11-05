var Node = require('./rivernode');
/*
For each downstream salmon that did not arrive from the first child, destroy
that salmon and append its name to each upstream salmon.

NOTE:
I will be handling fish when they arrive, perhaps this should be done during the misc step?
*/
var AppendUp = function(){
	Node.call(this, 'Append Up', false, false, false, false);
};

module.exports = AppendUp;

AppendUp.prototype = new Node('Append Up', false, false, false, false);

AppendUp.prototype.constructor = AppendUp;

AppendUp.prototype.addSalmon = function(a_Salmon, a_Source){
	if (this.shouldAddSalmon(a_Source, a_Source)){
		//if this came from the first child, or is going upstream
		//accept it as normal
		if (!a_Salmon.downstream || a_Source === this.upstream[0]){
			this.salmon.push(a_Salmon)
		} else {
			//otherwise, append it's name to all my upstream Salmon, 
			//and don't bother adding it
			for (var i = this.salmon.length - 1; i >= 0; i--) {
				if (!this.salmon[i].downstream){
					this.salmon[i].name += a_Salmon.name;
				}
			};
		}
	}
};