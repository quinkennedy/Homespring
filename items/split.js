var Node = require('./rivernode');
/*
Splits each salmon into a new salmon for each letter in the original salmon’s
name. The original salmon are destroyed.

NOTE:
doing this when salmon are added.
empty strings are just destroyed
*/
var Split = function(){
	Node.call(this, 'Split', false, false, false, false);
};

module.exports = Split;

Split.prototype = new Node('Split', false, false, false, false);

Split.prototype.constructor = Split;

Split.prototype.shouldAddSalmon = function(a_Salmon){
	for (var i = 0; i < a_Salmon.name.length; i++) {
		this.salmon.push(new Salmon(a_Salmon.name[i], a_Salmon.mature, a_Salmon.downstream));
	};
	return false;
};