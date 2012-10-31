var Salmon = require('./salmon'),
	Node = require('./rivernode'),
	Bear = require('./bear'),
	Universe = require('./universe'),
	Hatchery = require('./hatchery'),
	Spring = require('./spring'),
	Marshy = require('./marshy'),
	Snowmelt = require('./snowmelt'),
	Powers = require('./powers');
/*
test0:


test1:
Universe bear hatchery Hello. World!.
 Powers   marshy marshy snowmelt

test2:
Universe of bear hatchery says Hello. World!.
 It   powers     the marshy things;
the power of the snowmelt overrides.

test3:
Universe of marshy force. Field sense
shallows the hatchery saying Hello,. World!.
 Hydro. Power spring  sometimes; snowmelt
      powers   snowmelt always.
*/

var Homespring = function(){
	this.log = false;
};

global.Program = {
	root:undefined,
	quit:false,
	exit:function(){this.quit = true;}
};

Homespring.prototype.parse = function(a_sText){
	if (a_sText.length == 0){
		console.log("In Homespring, the null program is not a quine.");
		return false;
	}

	if (this.log)
		console.log(a_sText);
	//first lets convert to all our tokens
	//read into current token until we see a space not followed by a '.' or a newline
	var currChar, nextChar;
	var currToken = '', tokens = [];
	var pushToken = false;
	for (var i = 0; i < a_sText.length; i++) {
		currChar = a_sText[i];
		if (i < a_sText.length - 1){
			nextChar = a_sText[i+1];
		} else {
			nextChar = undefined;
			//since we are at the end of the text
			//we will want to push this final token
			//onto our token list
			pushToken = true;
		}
		if (currChar == ' '){
			if (nextChar == '.'){
				currToken += nextChar;
				i++;
			} else {
				pushToken = true;
			}
		} else if (currChar == '\n'){
			pushToken = true;
		} else if (currChar == '.'){
			if (nextChar == ' ' || nextChar == '\n'){
				currToken += nextChar;
				if (nextChar == '\n'){
					pushToken = true;
				}
				i++;
			} else {
				//NODE: I have chosen to treat the '.'
				//as a special character only when 
				//postfixed by a space or newline
				currToken += currChar;
			}
		} else {
			currToken += currChar;
		}

		if (pushToken){
			tokens.push(currToken);
			pushToken = false;
			currToken = '';
		}
	};

	if (this.log)
		console.log(tokens);

	//build the program tree (river network)
	var currParent, currNode;
	for (var i = 0; i < tokens.length; i++) {
		currToken = tokens[i];
		if (Program.root == undefined){
			if (currToken.length == 0){
				continue;
			} else {
				currNode = this.getNode(currToken);
				Program.root = currNode;
			}
		} else {
			if (currToken.length == 0){
				if (currParent.downstream != undefined){
					currParent = currParent.downstream;
				}
				continue;
			} else {
				currNode = this.getNode(currToken);
				currParent.addUpstream(currNode);
			}
		}
		currNode.downstream = currParent;
		currParent = currNode;
		currNode = undefined;
	};

	if (this.log)
		Program.root.logTree();
};

Homespring.prototype.nodeMap = {
	"bear":Bear,
	"marshy":Marshy,
	"universe":Universe,
	"hatchery":Hatchery,
	"powers":Powers,
	"snowmelt":Snowmelt
};

Homespring.prototype.getNode = function(a_sName){
	var n = this.nodeMap[a_sName.toLowerCase()];
	if (n == undefined){
		n = Spring; 
	}
	n = new n();
	n.name = a_sName;
	return n;
};

Homespring.prototype.run = function(a_nLimit){
	var i = 0;
	while(!Program.quit){
		if (this.log)
			console.log("######################## " + i);
		this.step();
		if (this.log)
			Program.root.logTree();
		i++;
		if (a_nLimit && a_nLimit <= i){
			break;
		}
	}
};

Homespring.prototype.step = function(){
	this.tickSnow();
	this.tickWater();
	this.tickPower();
	this.tickFish();
	this.tickMisc();
	//the universe might have killed execution during the misc step
	if (Program.quit){
		return false;
	}
	this.tickInput();
};

Homespring.prototype.runOrder = function(a_Node, a_sFunc, a_bPost){
	if (!a_bPost){
		a_Node[a_sFunc]();
	}
	for (var i = 0; i < a_Node.upstream.length; i++) {
		this.runOrder(a_Node.upstream[i], a_sFunc, a_bPost);
	};
	if (a_bPost){
		a_Node[a_sFunc]();
	}
};

/*
In the snow tick, the snow state of each node is updated. 
A node becomes snowy
if it is not currently blocking snowmelts and if one 
of its children is snowy. The
snow tick is propagated in a post-order fashion.
Certain nodes will be destroyed when snowmelt reaches them. A node that
is destroyed loses its abilities and its name (its name becomes “”).
*/
Homespring.prototype.tickSnow = function(){
	//console.log("~~ tickSnow");
	this.runOrder(Program.root, "tickSnow", false);
};

Homespring.prototype.tickWater = function(){
	//console.log("~~ tickWater");
	this.runOrder(Program.root, "tickWater", true);
};

Homespring.prototype.tickPower = function(){
	//console.log("~~ tickPower");
	this.runOrder(Program.root, "tickPower", true);
};

Homespring.prototype.tickFish = function(){
	//console.log("~~ tickFishDown");
	this.runOrder(Program.root, "tickFishDown", false);
	//console.log("~~ tickFishUp");
	this.runOrder(Program.root, "tickFishUp", true);
	//console.log("~~ tickFishHatch");
	this.runOrder(Program.root, "tickFishHatch", false);
};

Homespring.prototype.tickMisc = function(){
	//console.log("~~ tickMisc");
	this.runOrder(Program.root, "tickMisc", false);
};

Homespring.prototype.tickInput = function(){
	//console.log("~~ tickInput");
	//handle user input to spawn salmon
	//Program.root.salmon.push(new Salmon('input', true, false));
};

h = new Homespring();
h.parse([
	"Universe bear hatchery Hello. World!.",
	" Powers   marshy marshy snowmelt"].join('\n'));
h.run(10);
console.log("done");