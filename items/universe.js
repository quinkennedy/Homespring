var Node = require('./rivernode');
/*
If destroyed by a snowmelt, the program terminates. The program is terminated
in the miscellaneous tick following the snow tick in which the Universe is
destroyed.
*/
var Universe = function(){
	Node.call(this, 'Universe', false, false, false, false);
};

module.exports = Universe;

Universe.prototype = new Node('Universe', false, false, false, false);

Universe.prototype.constructor = Universe;

Universe.prototype.tickMisc = function(){
	if (this.snow){
		Program.exit();
	}
};