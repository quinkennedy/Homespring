global.Salmon = function(a_sName, a_bMature, a_bDownstream){
	this.name = a_sName;
	this.mature = a_bMature;
	this.downstream = a_bDownstream;
};

Salmon.prototype.toString = function(){
	return this.name + (this.mature ? ":M" : ":y") + (this.downstream ? ":D" : ":u");
};