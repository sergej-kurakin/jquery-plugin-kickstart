/**
 * Parent
 */
var myClass1 = function  (name) {
	this.text = '';
	this.className = 'myClass1';
	this.init(name);
}

myClass1.prototype.test = function () {
	console.log('myClass1::test:  ' + this.text);
};

myClass1.prototype.init = function (name) {
	this.text = name;
};

myClass1.prototype.test2 = function () {
	console.log('myClass1::test2: ' + this.text);
	console.log('myClass1::test2: ' + this.className);
};


/**
 * Descendant
 */
var myClass2 = function (name) {
	this.text = '';
	this.className = 'myClass2';
	this.init(name);
}

$.extendClass(myClass2, myClass1);

myClass2.prototype.test = function () {
	console.log('myClass2::test');
	myClass2.parent.test.apply(this);
	console.log('myClass2::test');
};

var o1 = new myClass1('One');
o1.test();
o1.test2();

var o2 = new myClass2('Two');
o2.test();
o2.test2();