var Salmon = require('./salmon'),
	Node = require('./rivernode'),
	Bear = require('./bear'),
	Universe = require('./universe'),
	Hatchery = require('./hatchery'),
	Spring = require('./spring'),
	Marshy = require('./marshy'),
	Snowmelt = require('./snowmelt'),
	Powers = require('./powers'),
	HydroPower = require('./hydropower'),
	Sense = require('./sense'),
	Shallows = require('./shallows'),
	ForceField = require('./forcefield');

var NotImplemented = function(){};
NotImplemented.prototype = new Node();
NotImplemented.prototype.constructor = NotImplemented;

var Homespring = function(){
	this.log = false;
};

global.Program = {
	root:undefined,
	isNull:false,
	quit:false,
	exit:function(){this.quit = true;}
};

Homespring.prototype.parse = function(a_sText){
	if (a_sText.length == 0){
		Program.isNull = true;
	}

	a_sText = a_sText.replace(/\r\n/g,"\n");
	if (this.log){
		console.log("INPUT:");
		console.log(a_sText);
	}
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

	if (this.log){
		console.log("TOKENS:");
		console.log(tokens);
	}

	//build the program tree (river network)
	//if we hit a token that creates an undefined node, warn the user
	//NOTE: excerpt from hstut.html:
	//		If the parser can't move down any more, the blank token is just treated like a normal token
	// this suggests that when you are at the root and receive a blank token, you add it as a spring with the name ''
	var currParent, currNode;
	for (var i = 0; i < tokens.length; i++) {
		currToken = tokens[i];
		if (Program.root == undefined){
			currNode = this.getNode(currToken);
			Program.root = currNode;
		} else {
			if (currToken.length == 0 && currParent.downstream != undefined){
				currParent = currParent.downstream;
				continue;
			} else {
				currNode = this.getNode(currToken);
				currParent.addUpstream(currNode);
			}
		}
		if (currNode instanceof NotImplemented){
			//we have not implemented this node type yet
			console.log('"'+currToken+'" has not been implemented yet');
			Program.quit = true;
		}
		currNode.downstream = currParent;
		currParent = currNode;
		currNode = undefined;
	};

	if (this.log){
		console.log("TREE:");
		Program.root.logTree();
	}
};

Homespring.prototype.nodeMap = {
	"hatchery":Hatchery,
	"hydro power":HydroPower,
	"snowmelt":Snowmelt,
	"shallows":Shallows,
	"rapids":NotImplemented,//Young salmon take two turns to pass through.
	"append down":NotImplemented,/*For each downstream salmon that did not arrive from the first child, destroy
that salmon and append its name to each downstream salmon that did arrive
from the first child.*/
	"bear":Bear,
	"force field":ForceField,
	"sense":Sense,
	"clone":NotImplemented,//For each salmon, create a young, downstream salmon with the same name.
	"young bear":NotImplemented,/*Eats every other mature salmon (the first mature salmon gets eaten, the second
one doesn’t, etc.). Young salmon are moved to the beginning of the list because
they don’t have to take the time to evade the bear.*/
	"bird":NotImplemented,//Eats young salmon.
	"upstream killing device":NotImplemented,/*When powered and if it contains more than one child, kills all the salmon in the
last child.*/
	"waterfall":NotImplemented,//Blocks upstream salmon
	"universe":Universe,
	"powers":Powers,
	"marshy":Marshy,
	"insulated":NotImplemented,//Blocks power.
	"upstream sense":NotImplemented,//Blocks the flow of electricity when upstream, mature salmon are present.
	"downstream sense":NotImplemented,//Blocks the flow of electricity when downstream, mature salmon are present.
	"evaporates":NotImplemented,//Blocks water and snowmelt when powered.
	"youth fountain":NotImplemented,//Makes all salmon young.
	"oblivion":NotImplemented,/*When powered, changes the name of each salmon to “”. Can be destroyed by
snowmelt.*/
	"pump":NotImplemented,//Very blocks salmon unless powered.
	"range sense":NotImplemented,//Blocks electricity when mature salmon are here or upstream.
	"fear":NotImplemented,//Very blocks salmon when powered.
	"reverse up":NotImplemented,/*For each downstream salmon that arrived from the second child, move it to the
first child unless it is prevented from moving there.*/
	"reverse down":NotImplemented,/*For each downstream salmon that arrived from the first child, move it to the
second child unless it is prevented from moving there.*/
	"time":NotImplemented,//Makes all salmon mature
	"lock":NotImplemented,//Very blocks downstream salmon and blocks snowmelt when powered.
	"inverse lock":NotImplemented,//Very blocks downstream salmon and blocks snowmelt when not powered.
	"young sense":NotImplemented,//Blocks electricity when young salmon are present.
	"switch":NotImplemented,//Blocks electricity unless mature salmon are present.
	"young switch":NotImplemented,//Blocks electricity unless young salmon are present.
	"narrows":NotImplemented,//Very blocks salmon if another salmon is present.
	"append up":NotImplemented,/*For each downstream salmon that did not arrive from the first child, destroy
that salmon and append its name to each upstream salmon.*/
	"young range sense":NotImplemented,//Blocks electricity when young salmon are here or upstream.
	"net":NotImplemented,//Very blocks mature salmon
	"force down":NotImplemented,/*For each downstream salmon that arrived from the first child, move it to the
second child unless it is prevented from moving there.
Also blocks upstream salmon from moving to the last child.*/
	"force up":NotImplemented,/*For each downstream salmon that arrived from the second child, move it to the
first child unless it is prevented from moving there.
Also blocks upstream salmon from moving to the first child.*/
	"spawn":NotImplemented,//When powered, makes all salmon upstream spawn.
	"power invert":NotImplemented,/*This node is powered if and only if none of its children are powered. Can be
destroyed by snowmelt.*/
	"current":NotImplemented,//Very blocks young salmon
	"bridge":NotImplemented,//If destroyed by snowmelt, blocks snowmelt and water and very blocks salmon.
	"split":NotImplemented,/*Splits each salmon into a new salmon for each letter in the original salmon’s
name. The original salmon are destroyed.*/
	"range switch":NotImplemented,//Blocks electricity unless mature salmon are here or upstream.
	"young range switch":NotImplemented//Blocks electricity unless young salmon are here or upstream.
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
	if (Program.isNull){
		console.log("In Homespring, the null program is not a quine.");
		return;
	}
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
	this.runOrder(Program.root, "tickWater", false);
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

if (!process.argv[2]) {
	console.log("you must include a filename for where to read the program from");
	console.log("node homespring.js <filename> [debug] [num_iterations]");
} else {
	//fs used for file read/write
	var fs = require("fs");
	try{
		var input = fs.readFileSync(process.argv[2], 'utf8').replace('\r\n','\n');
		h = new Homespring();

		if (process.argv[3] && process.argv[3] != '0' && process.argv[3].toLowerCase() != 'false' && process.argv[3].toLowerCase() != 'f'){
			h.log = true;
		}

		h.parse(input);

		var limit = undefined;
		if (process.argv[4]){
			limit = parseInt(process.argv[4]);
			if (limit != limit)//NaN
				limit = undefined;
		}
		h.run(limit);
		console.log("done");
	} catch (e){
		console.log("error while loading and running file:");
		console.log(e.stack);
	}
}