var Node = require('./rivernode');
/*
When powered, makes all salmon upstream spawn.

NOTE:
doing this during misc step
*/
var Spawn = function(){
	Node.call(this, 'Spawn', false, false, false, false);
};

module.exports = Spawn;

Spawn.prototype = new Node('Spawn', false, false, false, false);

Spawn.prototype.constructor = Spawn;

Spawn.prototype.tickMisc = function(){
	if (this.hasPower()){
		this.spawnTree();
	}
};