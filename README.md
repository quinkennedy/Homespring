node homespring.js &lt;filename> [debug] [limit]
&lt;filename> is required, and is the relative path to the file which contains the homespring program text
[debug] is optional and should be '0', 'f', or 'false' in order to keep debugging disabled (default). Any other values will enable debug output
[limit] is optional. If it is included, [debug] must be specified. This is used to limit the number of steps the interpreter will run before quitting regardless of program state.

examples:
node homespring.js examples/hello-3.hs
node homespring.js examples/hello-1.hs true 10

'done' is printed at the end of execution.
This project is written in Nodejs. 


from http://esolangs.org/wiki/Homespring

Homespring, alternatively HOtMEfSPRIbNG, is a high-level esoteric programming language created by Jeff Binder in 2003 with the express intention of being far higher level than anyone would ever reasonably need or want.
Programs define a map of data control segments through which data flows sequentially and deterministically, and all commands are based on a metaphor of salmon travelling upriver. Each datum is an object consisting of a character string called the "name" and a boolean called the "age" of the datum. Three classes of command can change the value of data (name or age), the behavior of each datum (this behavior can be fixed or vary based on each datum), and the whole of the map on which the data flow.
The name stands for Hatchery Oblivion through Marshy Energy from Snowmelt Powers Rapids Insulated but Not Great.

This is very much a work in progress. Starting with making the examples in the pdf work, then let's see what happens.
