var Node = require('./rivernode');
/*
When powered and if it contains more than one child, kills all the salmon in the
last child.
From original:
Kills everything in the node upstream towards the bottom when electrified.

NOTE:
I am implementing this during the Misc tick, 
we may want to implement a way to register for callbacks
so this node will be notified whenever the last child
receives salmon.
*/
var UpstreamKillingDevice = function(){
	Node.call(this, 'Upstream Killing Device', false, false, false, false);
};

module.exports = UpstreamKillingDevice;

UpstreamKillingDevice.prototype = new Node('Upstream Killing Device', false, false, false, false);

UpstreamKillingDevice.prototype.constructor = UpstreamKillingDevice;

UpstreamKillingDevice.prototype.tickMisc = function(){
	if (this.hasPower() && this.upstream.length > 1){
		//TODO:maybe we want some other way than simply 
		//reaching in and smashing my child's list of salmon
		this.upstream[this.upstream.length - 1].salmon = [];
	}
};