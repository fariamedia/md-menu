
/**
  * trim()
  * -------------------------
  * @desc: removes uneccesry white space from a string
  * @type: (string)
*/
String.prototype.trim = function(){
	return this.replace(/^\s+|\s+$/g, "");
};


/**
  * toCamel()
  * -------------------------
  * @desc: converts string to camel case format
  * @type: (string)
*/
String.prototype.toCamel = function(){
	return this.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
};


/**
  * toDash()
  * -------------------------
  * @desc: converts string from camel case to dashed format
  * @type: (string)
*/
String.prototype.toDash = function(){
	return this.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
};


/**
  * toUnderscore()
  * -------------------------
  * @desc: converts string from camel case to underscore format
  * @type: (string)
*/
String.prototype.toUnderscore = function(){
	return this.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
};
