usage
=======
```node homespring.js <filename> [debug] [limit]```  
* ```<filename>``` is required, and is the relative path to the file which contains the homespring program text  
* ```[debug]``` is optional and should be '0', 'f', or 'false' in order to keep debugging disabled (default). Any other values will enable debug output  
* ```[limit]``` is optional. If it is included, [debug] must be specified. This is used to limit the number of steps the interpreter will run before quitting regardless of program state.  

examples:  
```node homespring.js examples/hello-3.hs```  
```node homespring.js examples/hello-1.hs true 10```  

requirements
===========
download and install Node.js http://nodejs.org/  

background
==========
from http://esolangs.org/wiki/Homespring

Homespring, alternatively HOtMEfSPRIbNG, is a high-level esoteric programming language created by Jeff Binder in 2003 with the express intention of being far higher level than anyone would ever reasonably need or want.
Programs define a map of data control segments through which data flows sequentially and deterministically, and all commands are based on a metaphor of salmon travelling upriver. Each datum is an object consisting of a character string called the "name" and a boolean called the "age" of the datum. Three classes of command can change the value of data (name or age), the behavior of each datum (this behavior can be fixed or vary based on each datum), and the whole of the map on which the data flow.
The name stands for Hatchery Oblivion through Marshy Energy from Snowmelt Powers Rapids Insulated but Not Great.

This is very much a work in progress. Starting with making the examples in the pdf work, then let's see what happens.

changes
=======
* v0.1.0 documentation says snow and water ticks are post order, I am doing them pre-order so snow and water only move downstream 1 level per tick. This seems to parallel how the interpreter is implemented in v0.1.0.
* v0.1.0 documentation says of springs: "it creates water." I have implemented them the same as snowmelt so this is changed to: "Creates water at the end of each water tick." This means that water starts flowing downstream in the second tick. This was done to get hello-3.hs to work correctly.
* for reverse/force down/up: The documentation does not specify, but some examples (add.hs and others) seem to suggest that the fish is not only pushed up to the first/second child, but is also changed to an upstream fish.