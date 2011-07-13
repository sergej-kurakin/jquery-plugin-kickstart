/**
 * Parent
 */
var myClass1 = function (name) {
	this.text = '';
	this.className = 'myClass1';
	this.init(name);
}

myClass1.prototype.init = function (name) {
	this.text = name;
};


/**
 * Descendant of myClass1
 */
var myClass2 = function (name) {
	this.text = '';
	this.className = 'myClass2';
	this.init(name);
}

$.extendClass(myClass2, myClass1);

/**
 * Another Descendant of myClass1
 */
var myClass3 = function (name) {
	myClass3.parent.constructor.call(this, name);
}

$.extendClass(myClass3, myClass1);

var o1 = new myClass1('One');

var o2 = new myClass2('Two');

var o3 = new myClass3('Three');