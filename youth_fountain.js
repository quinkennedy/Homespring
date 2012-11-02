var Node = require('./rivernode');
/*
Makes all salmon young.
*/
var YouthFountain = function(){
	Node.call(this, 'Youth Fountain', false, false, false, false);
};

module.exports = YouthFountain;

YouthFountain.prototype = new Node('Youth Fountain', false, false, false, false);

YouthFountain.prototype.constructor = YouthFountain;

YouthFountain.prototype.shouldAddSalmon = function(a_Salmon){
	a_Salmon.mature = false;
	return true;
};