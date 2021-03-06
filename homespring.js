var Node = require('./items/rivernode'),
	Bear = require('./items/bear'),
	Universe = require('./items/universe'),
	Hatchery = require('./items/hatchery'),
	Spring = require('./items/spring'),
	Marshy = require('./items/marshy'),
	Snowmelt = require('./items/snowmelt'),
	Powers = require('./items/powers'),
	HydroPower = require('./items/hydro_power'),
	Sense = require('./items/sense'),
	Shallows = require('./items/shallows'),
	ForceField = require('./items/force_field'),
	Rapids = require('./items/rapids'),
	Oblivion = require('./items/oblivion'),
	Insulated = require('./items/insulated'),
	Evaporates = require('./items/evaporates'),
	DownstreamSense = require('./items/downstream_sense'),
	UpstreamSense = require('./items/upstream_sense'),
	YoungSense = require('./items/young_sense'),
	UpstreamKillingDevice = require('./items/upstream_killing_device'),
	Switch = require('./items/switch'),
	YoungSwitch = require('./items/young_switch'),
	Bird = require('./items/bird'),
	YoungBear = require('./items/young_bear'),
	YouthFountain = require('./items/youth_fountain'),
	Lock = require('./items/lock'),
	Time = require('./items/time'),
	Bridge = require('./items/bridge'),
	Pump = require('./items/pump'),
	Narrows = require('./items/narrows'),
	Current = require('./items/current'),
	PowerInvert = require('./items/power_invert'),
	ReverseDown = require('./items/reverse_down'),
	ReverseUp = require('./items/reverse_up'),
	ForceDown = require('./items/force_down'),
	ForceUp = require('./items/force_up'),
	Clone = require('./items/clone'),
	Split = require('./items/split'),
	InverseLock = require('./items/inverse_lock'),
	Waterfall = require('./items/waterfall'),
	Net = require('./items/net'),
	Fear = require('./items/fear'),
	AppendDown = require('./items/append_down'),
	AppendUp = require('./items/append_up'),
	RangeSense = require('./items/range_sense'),
	RangeSwitch = require('./items/range_switch'),
	YoungRangeSense = require('./items/young_range_sense'),
	YoungRangeSwitch = require('./items/young_range_switch'),
	Spawn = require('./items/spawn'),
	Gyser = require('./items/gyser');

/*
Since Salmon is defined globally in salmon.js, we don't have to assign it to anything here.
However, we still need to import the file.
 */
require('./items/salmon');

/*
A dummy class that acts like a river node so that we can parse the program and 
detect which nodes are not implemented yet.
 */
var NotImplemented = function(){Node.call(this, 'N.I.', false, false, false, false)};
NotImplemented.prototype = new Node('N.I.', false, false, false, false);
NotImplemented.prototype.constructor = NotImplemented;

var Homespring = function(){
	this.log = false;
	this.debug = false;
	this.intervalId = undefined;
};

global.Program = {
	root:undefined,
	input:undefined,
	maxSteps:undefined,
	currStep:0,
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
			if (this.log){
				console.log('done');
			}
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
				//make sure we push this token if this is the end of input
				if (!pushToken && i >= a_sText.length - 1){
					pushToken = true;
					if (this.log){
						console.log('done');
					}
				}
			} else {
				//NOTE: I have chosen to treat the '.'
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
		if (Program.root != undefined){
			Program.root.logTree();
		}
	}
};

Homespring.prototype.nodeMap = {
	"hatchery":Hatchery,/*When powered, creates a mature, upstream salmon named “homeless”. Operates
during the fish tick hatch step.*/
	"hydro power":HydroPower,//Creates electricity when watered. Can be destroyed by snowmelt.
	"snowmelt":Snowmelt,
	"shallows":Shallows,//Mature salmon take two turns to pass through.
	"rapids":Rapids,//Young salmon take two turns to pass through.
	"append down":AppendDown,/*For each downstream salmon that did not arrive from the first child, destroy
that salmon and append its name to each downstream salmon that did arrive
from the first child.*/
	"bear":Bear,
	"force field":ForceField,
	"sense":Sense,//Blocks electricity when mature salmon are present.
	"clone":Clone,//For each salmon, create a young, downstream salmon with the same name.
	"young bear":YoungBear,/*Eats every other mature salmon (the first mature salmon gets eaten, the second
one doesn’t, etc.). Young salmon are moved to the beginning of the list because
they don’t have to take the time to evade the bear.*/
	"bird":Bird,//Eats young salmon.
	"upstream killing device":UpstreamKillingDevice,/*When powered and if it contains more than one child, kills all the salmon in the
last child.*/
	"waterfall":Waterfall,//Blocks upstream salmon
	"universe":Universe,
	"powers":Powers,//Generates power.
	"marshy":Marshy,//Snowmelts take two turns to pass through.
	"insulated":Insulated,//Blocks power.
	"upstream sense":UpstreamSense,//Blocks the flow of electricity when upstream, mature salmon are present.
	"downstream sense":DownstreamSense,
	"evaporates":Evaporates,//Blocks water and snowmelt when powered.
	"youth fountain":YouthFountain,//Makes all salmon young.
	"oblivion":Oblivion,/*When powered, changes the name of each salmon to “”. Can be destroyed by
snowmelt.*/
	"pump":Pump,//Very blocks salmon unless powered.
	"range sense":RangeSense,//Blocks electricity when mature salmon are here or upstream.
	"fear":Fear,//Very blocks salmon when powered.
	"reverse up":ReverseUp,/*For each downstream salmon that arrived from the second child, move it to the
first child unless it is prevented from moving there.*/
	"reverse down":ReverseDown,/*For each downstream salmon that arrived from the first child, move it to the
second child unless it is prevented from moving there.*/
	"time":Time,//Makes all salmon mature
	"lock":Lock,//Very blocks downstream salmon and blocks snowmelt when powered.
	"inverse lock":InverseLock,//Very blocks downstream salmon and blocks snowmelt when not powered.
	"young sense":YoungSense,//Blocks electricity when young salmon are present.
	"switch":Switch,//Blocks electricity unless mature salmon are present.
	"young switch":YoungSwitch,//Blocks electricity unless young salmon are present.
	"narrows":Narrows,//Very blocks salmon if another salmon is present.
	"append up":AppendUp,/*For each downstream salmon that did not arrive from the first child, destroy
that salmon and append its name to each upstream salmon.*/
	"young range sense":YoungRangeSense,//Blocks electricity when young salmon are here or upstream.
	"net":Net,//Very blocks mature salmon
	"force down":ForceDown,/*For each downstream salmon that arrived from the first child, move it to the
second child unless it is prevented from moving there.
Also blocks upstream salmon from moving to the last child.*/
	"force up":ForceUp,/*For each downstream salmon that arrived from the second child, move it to the
first child unless it is prevented from moving there.
Also blocks upstream salmon from moving to the first child.*/
	"spawn":Spawn,//When powered, makes all salmon upstream spawn.
	"power invert":PowerInvert,/*This node is powered if and only if none of its children are powered. Can be
destroyed by snowmelt.*/
	"current":Current,//Very blocks young salmon
	"bridge":Bridge,//If destroyed by snowmelt, blocks snowmelt and water and very blocks salmon.
	"split":Split,/*Splits each salmon into a new salmon for each letter in the original salmon’s
name. The original salmon are destroyed.*/
	"range switch":RangeSwitch,//Blocks electricity unless mature salmon are here or upstream.
	"young range switch":YoungRangeSwitch//Blocks electricity unless young salmon are here or upstream.

};

Homespring.prototype.useExtended = function(){
	this.nodeMap["gyser"] = Gyser;//50% chance of creating water each iteration
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
		this.cleanup();
		return;
	}
	Program.maxSteps = a_nLimit;
	if (this.debug){
		setTimeout(this.step.bind(this), 0);
		console.log("DEBUGGING");
	} else {
		this.intervalId = setInterval(this.step.bind(this), 0);
	}
};

Homespring.prototype.cleanup = function(){
	if (this.intervalId != undefined){
		clearInterval(this.intervalId);
	}
	this.stdin.destroy();
	if (this.log){
		console.log("done");
	} else {
		console.log();
	}
};

Homespring.prototype.step = function(){
	if (Program.quit || (Program.maxSteps != undefined && Program.currStep >= Program.maxSteps)){
		Program.quit = true;
	} else {
		if (this.log){
			console.log("######################## " + Program.currStep);
			Program.root.logTree();
		}
		this.tickSnow();
		this.tickWater();
		this.tickPower();
		this.tickFish();
		this.tickMisc();
		//the universe might have killed execution during the misc step
		if (!Program.quit){
			this.tickInput();
		}
		Program.currStep++;
	}
	if (Program.quit){
		this.cleanup();
	}
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
	if (Program.input != undefined){
		//we want to take off the ending newline (and for windows the return)
		Program.input = Program.input.replace(/\r{0,1}\n$/, '');
		if (this.log){
			console.log("INPUT:"+Program.input.replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(" ","\\b").replace(/\t/g,"\\t"));
		}
		//input creates mature salmon, this was done to get examples/quiz.hs working
		Program.root.addSalmon(new Salmon(Program.input, true, false));
		Program.input = undefined;
	}
};

/**
 * Handle flags etc
 */
var processArgumentsAndGo = function(){
	var invalidParams = false;
	if (!process.argv[2]) {
		console.log("you must include a filename for where to read the program from");
		console.log("node homespring.js <filename>");
		invalidParams = true;
	} 
    var argv = process.argv;
    var log = false;
    var limit = undefined;
    var debug = false;
    var extended = false;
    var i = 2;
    //look at all but the last flag. the last one is the file name to open
    for(; i < argv.length - 1; i++){
        switch(argv[i]){
            case "-h":
            case "--help":
                printHelp();
                break;
            case "-d":
            case "--debug":
            	log = true;
            	if (limit == undefined){
            		debug = true;
            	}
            	break;
            case "-e":
            case "--extended":
            	extended = true;
            	break;
            case "-n":
            	debug = false;
            	limit = setIterationLimit(argv[++i]);
            	break;
            default:
            	console.log("unknown flag: " + argv[i]);
            	invalidParams = true;
            	break;
        }
    }
    if (i >= argv.length){
    	console.log("incorrectly formatted arguments");
    	invalidParams = true;
    }
    if (invalidParams){
    	console.log("use --help to see usage");
    	return;
    }

    var filename = argv[argv.length - 1];

    var fs = require("fs");
    try{
		var input = fs.readFileSync(filename, 'utf8').replace('\r\n','\n');
		h = new Homespring();
		h.log = log;
		h.debug = debug;
		if (extended){
			h.useExtended();
		}
		h.parse(input);

		//setup user input
		//stdin used for user input
		h.stdin = process.openStdin();
		h.stdin.setEncoding('utf8');

		/**
		 * Here we process each line of input from the user
		 * @param  {obj} command Some command object that I can .toString to get the raw user input
		 */
		h.stdin.on('data',function(command){
			var input = command.toString();
			if (input.length == 1){
				if (h.debug){
					setTimeout(h.step.bind(h), 0);
				}
			} else {
				Program.input = command.toString();
			}
		});

		h.run(limit);
    } catch (e){
		console.log("error while loading and running file:");
		console.log(e);
		console.log(e.stack);
	}
};

var setIterationLimit = function(newLimit){
    var tempLimit = parseInt(newLimit);
    //check that tempPort != NaN
    //and that the port is in the valid port range
    if (tempLimit != tempLimit){
    	tempLimit = undefined;
    } else if (tempLimit < 0){
    	tempLimit = 0;
    }
    return tempLimit;
};

var printHelp = function(){
    console.log("command line parameters:");
    console.log("\t--help (-h): print this help text");
    console.log("\t--debug (-d): log each step of processing. Enables stepping through the iterations unless pared with -n");
    console.log("\t--extended (-e): use extended semantics");
    console.log("\t-n [numIterations]: tells the interpreter to simulate at most numIterations number of iterations");
    console.log("examples:");
    console.log("\tnode homespring.js -d -n 1000 examples/hello-1.hs");
    console.log("\tnode homespring.js -n 10 examples/name.hs");
};

processArgumentsAndGo();

/*
if (!process.argv[2]) {
	console.log("you must include a filename for where to read the program from");
	console.log("node homespring.js <filename> [logging] [num_iterations]");
} else {
	//fs used for file read/write
	var fs = require("fs");

	try{
		var input = fs.readFileSync(process.argv[2], 'utf8').replace('\r\n','\n');
		h = new Homespring();

		if (process.argv[3] && process.argv[3] != '0' && process.argv[3].toLowerCase() != 'false' && process.argv[3].toLowerCase() != 'f'){
			h.log = true;
			h.debug = true;
		}

		h.parse(input);

		var limit = undefined;
		if (process.argv[4]){
			limit = parseInt(process.argv[4]);
			if (limit != limit){//NaN
				limit = undefined;
			} else {
				h.debug = false;//turn off debugging if we are only running a specific number of iterations
			}
		}

		//setup user input
		//stdin used for user input
		h.stdin = process.openStdin();
		h.stdin.setEncoding('utf8');

		/**
		 * Here we process each line of input from the user
		 * @param  {obj} command Some command object that I can .toString to get the raw user input
		 *//*
		h.stdin.on('data',function(command){
			var input = command.toString();
			if (input.length == 1){
				if (h.debug){
					setTimeout(h.step.bind(h), 0);
				}
			} else {
				Program.input = command.toString();
			}
		});

		h.run(limit);
	} catch (e){
		console.log("error while loading and running file:");
		console.log(e);
		console.log(e.stack);
	}
}*/