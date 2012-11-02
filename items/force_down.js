var ReverseDown = require('./reverse_down');
/*
For each downstream salmon that arrived from the first child, move it to the
second child unless it is prevented from moving there.
Also blocks upstream salmon from moving to the last child.
*/
var ForceDown = function(){
	ReverseDown.call(this);
	this.name = "Force Down";
};

module.exports = ForceDown;

ForceDown.prototype = new ReverseDown();

ForceDown.prototype.constructor = ForceDown;

ForceDown.prototype.preTickFishUp = function(){
	this.lastChild = this.upstream.pop();
};

ForceDown.prototype.postTickFishUp = function(){
	this.upstream.push(this.lastChild);
};