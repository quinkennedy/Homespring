var Node = function(a_sName, a_bPower, a_bWater, a_bSnow, a_bDestroyed, a_nDownstream){
	this.name = a_sName;
	this.power = a_bPower;
	this.water = a_bWater;
	this.snow = a_bSnow;
	this.destroyed = a_bDestroyed;
	this.salmon = [];
	this.upstream = [];
	this.downstream = a_nDownstream;
	this.blockWater = false;
	this.blockSnow = false;
	this.blockPower = false;
	this.blockSalmon = false;
	this.blockSalmonVery = false;
	this.generatingPower = false;
};

module.exports = Node;

Node.prototype.addUpstream = function(a_Node){
	this.upstream.push(a_Node);
};

//post-order
Node.prototype.tickSnow = function(){
	//console.log(this.name);
	if (!this.blockSnow){
		for (var i = this.upstream.length - 1; i >= 0; i--) {
			if (this.upstream[i].snow){
				this.snow = true;
				break;
			}
		};
	}
	this.postSnow();
};

//override
Node.prototype.postSnow = function(){};

//post-order
Node.prototype.tickWater = function(){
	//console.log(this.name);
	if (!this.blockWater){
		for (var i = this.upstream.length - 1; i >= 0; i--) {
			if (this.upstream[i].water){
				this.water = true;
				break;
			}
		};
	}
	this.postWater();
};

//override
Node.prototype.postWater = function(){};

//determine whether this node should _generate_ power
Node.prototype.tickPower = function(){
	//console.log(this.name);
};

//pre-order
//this will push fish downstream
Node.prototype.tickFishDown = function(){
	//console.log(this.name);
	var currSalmon;
	for (var i = this.salmon.length - 1; i >= 0; i--) {
		currSalmon = this.salmon[i];
		if (currSalmon.downstream){
			if (this.downstream == undefined){
				console.log(currSalmon.name);
			} else {
				this.downstream.salmon.push(currSalmon);
			}
			this.salmon.splice(i, 1);
		}
	};
	this.postTickFishDown();
};

//override
Node.prototype.postTickFishDown = function(){};

//tells us if this subtree contains a node with the specified
//name
Node.prototype.containsName = function(a_sName){
	if (this.name == a_sName){
		return true;
	}
	for (var i = 0; i < this.upstream.length; i++) {
		if (this.upstream[i].containsName(a_sName)){
			return true;
		}
	};
	return false;
};

//check children if they have power
Node.prototype.hasPower = function(){
	if (this.generatingPower){
		return true;
	} else if (this.blockPower){
		return false;
	}

	for (var i = 0; i < this.upstream.length; i++) {
		if (this.upstream[i].hasPower()){
			return true;
		}
	};
	return false;
};

//post-order
Node.prototype.tickFishUp = function(){
	//console.log(this.name);
	//if we are blocking salmon (blocking salmon from leaving)
	//then all upstream salmon must spawn here
	var currSalmon, salmonMoved;
	for (var i = this.salmon.length - 1; i >= 0; i--) {
		currSalmon = this.salmon[i]
		if (!currSalmon.downstream){
			salmonMoved = false;
			//for each upstream fish, try to find a
			//child node with that fish's name
			for (var j = 0; j < this.upstream.length && !salmonMoved && !this.blockSalmon; j++) {
				if (!this.upstream[j].blockSalmonVery && this.upstream[i].containsName(currSalmon.name)){
					this.upstream[j].salmon.push(currSalmon);
					this.salmon.splice(i,1);
					salmonMoved = true;
					break;
				}
			};
			if (salmonMoved){
				continue;
			}
			//for each upstream fish, try to move to _any_ child node
			for (var j = 0; j < this.upstream.length && !salmonMoved && !this.blockSalmon; j++) {
				if (!this.upstream[j].blockSalmonVery){
					this.upstream[j].salmon.push(currSalmon);
					this.salmon.splice(i,1);
					salmonMoved = true;
					break;
				}
			};
			if (salmonMoved){
				continue;
			}
			//spawn this salmon
			currSalmon.mature = true;
			currSalmon.downstream = true;
			this.salmon.push(new Salmon(this.name, false, true));
		}
	};
	this.postTickFishUp();
};

//override
Node.prototype.postTickFishUp = function(){};

//pre-order
Node.prototype.tickFishHatch = function(){
	//console.log(this.name);
};

//pre-order
Node.prototype.tickMisc = function(){
	//console.log(this.name);
};

Node.prototype.logTree = function(a_nLevel){
	a_nLevel = a_nLevel || 0;
	var output = '';
	for (var i = a_nLevel - 1; i >= 1; i--) {
		output += '| ';
	};
	if (a_nLevel > 0){
		output += '|_';
	}
	output += this.name.replace('\n','\\n');
	output += (this.generatingPower ? ":P" : '');
	output += (this.snow ? ":S" : '');
	output += (this.water ? ":W" : '');
	output += (this.blockWater ? ":Bw" : '');
	output += (this.blockPower ? ":Bp" : '');
	output += (this.blockSalmon ? ":Bf" : '');
	output += (this.blockSnow ? ":Bs" : '');
	output += (this.blockSalmonVery ? ":Bfv" : '');
	output += (this.hasPower() ? ":p" : '');
	output += "[" + this.salmon.toString() + "]";
	console.log(output);
	var nextLevel = a_nLevel + 1;
	for (var i = 0; i < this.upstream.length; i++) {
		this.upstream[i].logTree(nextLevel);
	};
};