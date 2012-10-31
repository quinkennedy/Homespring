var Node = require('./rivernode');
/*
Eats mature salmon.
NOTE: I have chosen to do this during the misc step
      It may be better to try and do it while fish are arriving
*/
var Bear = function(){
	Node.call(this, 'Bear', false, false, false, false);
};

module.exports = Bear;

Bear.prototype = new Node('Bear', false, false, false, false);

Bear.prototype.constructor = Bear;

Bear.prototype.tickMisc = function(){
	for (var i = this.salmon.length - 1; i >= 0; i--) {
		if (this.salmon[i].mature){
			this.salmon.splice(i,1);
		}
	};
};
