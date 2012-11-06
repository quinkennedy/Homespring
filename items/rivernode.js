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

Node.prototype.doesVeryBlockSalmon = function(a_Salmon){
	return this.blockSalmonVery;
};

//override
Node.prototype.preSnow = function(){};

//post-order
Node.prototype.tickSnow = function(){
	this.preSnow();
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

//override
Node.prototype.preWater = function(){};

//post-order
Node.prototype.tickWater = function(){
	this.preWater();
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

//override
Node.prototype.preTickFishDown = function(){};

//pre-order
//this will push fish downstream
Node.prototype.tickFishDown = function(){
	this.preTickFishDown();
	//console.log(this.name);
	if (!this.blockSalmon){
		var currSalmon;
		for (var i = this.salmon.length - 1; i >= 0; i--) {
			currSalmon = this.salmon[i];
			if (currSalmon.downstream && this.shouldMoveSalmon(currSalmon)){
				if (this.downstream == undefined){
					//use stdout because console.log adds a newline
					process.stdout.write(currSalmon.name);
					//console.log(currSalmon.name);
					this.salmon.splice(i, 1);
				} else if (!this.downstream.doesVeryBlockSalmon(currSalmon)) {
					this.downstream.addSalmon(currSalmon, this);
					this.salmon.splice(i, 1);
				}
			}
		};
	}
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

/**
 * Tells us if this subtree contains any salmon which meet the filters passed in.
 * @param  {boolean} a_bMature     says whether to look for mature salmon or young salmon. If undefined, look for salmon of any age.
 * @param  {boolean} a_bDownstream says whether to look for salmon moving upstream or downstream. If undefined, look for salmon moving either direction.
 * @return {boolean}               True iff there are salmon in this subtree that match the passed-in filters.
 */
Node.prototype.containsSalmon = function(a_bMature, a_bDownstream){
	var match = false;
	var currSalmon;
	for (var i = this.salmon.length - 1; i >= 0 && !match; i--) {
		currSalmon = this.salmon[i];
		match |= (a_bMature == undefined ? true : currSalmon.mature == a_bMature) &&
					(a_bDownstream == undefined ? true : currSalmon.downstream == a_bDownstream);
	};
	for (var i = this.upstream.length - 1; i >= 0 && !match; i--) {
		match |= this.upstream[i].containsSalmon();
	};
	return match;
};

Node.prototype.implHasPower = function(){
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

//check children if they have power
Node.prototype.hasPower = function(){
	return this.implHasPower();
};

//override
Node.prototype.preTickFishUp = function(){};

//post-order
Node.prototype.tickFishUp = function(){
	this.preTickFishUp();
	//console.log(this.name);
	//if we are blocking salmon (blocking salmon from leaving)
	//then all upstream salmon must spawn here
	var currSalmon, salmonMoved;
	for (var i = this.salmon.length - 1; i >= 0; i--) {
		currSalmon = this.salmon[i]
		if (!currSalmon.downstream && this.shouldMoveSalmon(currSalmon)){
			salmonMoved = false;
			//for each upstream fish, try to find a
			//child node with that fish's name
			for (var j = 0; j < this.upstream.length && !salmonMoved && !this.blockSalmon; j++) {
				if (!this.upstream[j].doesVeryBlockSalmon(currSalmon) && this.upstream[j].containsName(currSalmon.name)){
					this.upstream[j].addSalmon(currSalmon, this);
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
				if (!this.upstream[j].doesVeryBlockSalmon(currSalmon)){
					this.upstream[j].addSalmon(currSalmon, this);
					this.salmon.splice(i,1);
					salmonMoved = true;
					break;
				}
			};
			if (salmonMoved){
				continue;
			}
			//spawn this salmon
			this.spawnSalmon(i);
		}
	};
	this.postTickFishUp();
};

Node.prototype.spawnSalmon = function(a_nIndex){
	//here we remove the specified salmon, and re-add it at the head
	//but we may want to modify it in-place...
	var currSalmon = this.salmon.splice(a_nIndex, 1)[0];
	currSalmon.mature = true;
	currSalmon.downstream = true;
	this.addSalmon(currSalmon, this);
	this.addSalmon(new Salmon(this.name, false, true), this);
};

Node.prototype.spawnTree = function(){
	for (var i = this.salmon.length - 1; i >= 0; i--) {
		this.spawnSalmon(i);
	};
	for (var i = this.upstream.length - 1; i >= 0; i--) {
		this.upstream[i].spawnTree();
	};
};

//override
Node.prototype.shouldAddSalmon = function(a_Salmon){
	return true;
};

Node.prototype.addSalmon = function(a_Salmon, a_Source){
	if (this.shouldAddSalmon(a_Salmon)){
		this.salmon.push(a_Salmon);
	}
	this.postAddSalmon(a_Salmon);
};

Node.prototype.postAddSalmon = function(a_Salmon){
};

//override
Node.prototype.shouldMoveSalmon = function(a_Salmon){
	return true;
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

Node.prototype.logTree = function(a_barrMoreChildren){
	a_barrMoreChildren = a_barrMoreChildren || [];
	//console.log(this.name);
	//console.log(a_barrMoreChildren.length);
	var output = '';
	for (var i = 0; i < a_barrMoreChildren.length - 1; i++) {
		if (a_barrMoreChildren[i]){
			output += '| ';
		} else {
			output += '  ';
		}
	};
	if (a_barrMoreChildren.length > 0){
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
	a_barrMoreChildren.push(true);
	for (var i = 0; i < this.upstream.length; i++) {
		if (i == this.upstream.length - 1){
			a_barrMoreChildren.pop();
			a_barrMoreChildren.push(false);
		}
		this.upstream[i].logTree(a_barrMoreChildren);
	};
	a_barrMoreChildren.pop();
};