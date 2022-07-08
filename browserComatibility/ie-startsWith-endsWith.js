//endsWith兼容ie8
String.prototype.endsWith=function(str){
	if(str==null||str==""||this.length==0||str.length>this.length)
		return false;
	if(this.substring(this.length-str.length)==str)
		return true;
	else
		return false;
	return true;
}

//startsWith兼容ie,直接使用str.startsWith("abc")方式调用即可
String.prototype.startsWith = function(str) {
	var reg = new RegExp("^" + str);
	return reg.test(this);
}