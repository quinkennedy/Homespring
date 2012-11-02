var ReverseUp = require('./reverse_up');
/*
For each downstream salmon that arrived from the second child, move it to the
first child unless it is prevented from moving there.
Also blocks upstream salmon from moving to the first child.
*/
var ForceUp = function(){
	ReverseUp.call(this);
	this.name = "Force Up";
};

module.exports = ForceUp;

ForceUp.prototype = new ReverseUp();

ForceUp.prototype.constructor = ForceUp;

ForceUp.prototype.preTickFishUp = function(){
	this.firstChild = this.upstream.splice(0, 1)[0];
};

ForceUp.prototype.postTickFishUp = function(){
	this.upstream.splice(0, 0, this.firstChild);
};