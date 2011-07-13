/**
 * Suppa-Mega-OOP Framework from http://javascript.info/tutorial/pseudo-classical-pattern
 * Changed a bit to be in one function
 */
(function($){
	
	$.extendClass = function (Child, Parent) {
		function TmpFunction() {}
		TmpFunction.prototype = Parent.prototype;

		Child.prototype = new TmpFunction();
		Child.prototype.constructor = Child;
		Child.parent = Parent.prototype;
	}
	
})(jQuery);