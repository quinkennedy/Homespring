var Node = require('./rivernode');
/*
Eats every other mature salmon (the first mature salmon gets eaten, the second
one doesn’t, etc.). Young salmon are moved to the beginning of the list because
they don’t have to take the time to evade the bear.

NOTE:
perhaps the re-ordering should happen during the misc tick? i'm doing it when
fish are added.

TODO: the original documentation mentions that operations such as Bear should be performed during the misc step.
*/
var YoungBear = function(){
	Node.call(this, 'YoungBear', false, false, false, false);
	this.eatNext = true;
};

module.exports = YoungBear;

YoungBear.prototype = new Node('YoungBear', false, false, false, false);

YoungBear.prototype.constructor = YoungBear;

YoungBear.prototype.shouldAddSalmon = function(a_Salmon){
	if (a_Salmon.mature){
		var eatThis = this.eatNext;
		this.eatNext = !this.eatNext;
		return !eatThis;
	}
	return true;
};

YoungBear.prototype.addSalmon = function(a_Salmon){
	if (this.shouldAddSalmon(a_Salmon)){
		if (!a_Salmon.mature){
			this.salmon.push(a_Salmon);
		} else {
			var added = false;
			for (var i = this.salmon.length - 1; i >= 0 && !added; i--) {
				if (this.salmon[i].mature){
					this.salmon.splice(i+1,0, a_Salmon);
					added = true;
				}
			};
			if (!added){
				this.salmon.splice(0,0,a_Salmon);
			}
		}
	}
};