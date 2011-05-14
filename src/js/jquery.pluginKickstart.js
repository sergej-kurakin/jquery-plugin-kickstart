(function($) {

	var namespace = 'pluginKickstart';

	// plugin class that does all work
	function myPluginKickstart(obj, settings) {
		
		var base = this;
		
		// default settings for plugin
		base.settings = {
			'defaultText': 'text'
		};
		
		// extending with options
		if (settings) {
			$.extend(base.settings, settings);
		}
		
		base.obj = obj; // actual DOM element
		base.$obj = $(obj); // jQuery version of DOM element
		
		// init method
		base.init = function () {
			// init code
			
			// example call of text method
			base.$obj.text(base.settings.defaultText);
			
			// example call of internal method to bind example events on DOM element
			base.bindEvents();
		};

		// does nothing except increment
		base.show = function() {
			// code for show method
		};

		// does nothing except increment, changes text of the binded object
		base.hide = function() {
			// code for hide method
		};

		// update content of the settings.text and changes text of the binded object
		base.update = function(content) {
			// code for update method using data from content parameter
		};

		// method called on mouse click
		base.click = function() {
			// code for click method
		};

		// example method called on mouseover: starts animation with interval
		base.over = function() {
			base.$obj.css('color', 'red');
		};

		// should destroy objects, done to test unbind
		base.destroy = function() {
			// code for object destruction
			
			// example of unbind call to unbind only events from this plugin
			base.$obj.unbind('.' + namespace);
		};

		// example  method called on mouseout, stops animation
		base.out = function() {
			base.$obj.css('color', 'black');
		};

		// event binder inside method, example code how to bind events with namespace
		base.bindEvents = function() {
			base.$obj.bind('mouseover.' + namespace,
				function() {
					base.over();
				});

			base.$obj.bind('mouseout.' + namespace,
				function() {
					base.out();
				});
		};

		base.init();

	}

	// methods that are available public, most code taken from http://docs.jquery.com/Plugins/Authoring
	var methods = {
		// public initiation with settings
		init: function(settings) {
			return this.each(function() {
				var $this = $(this);
				// building object
				var obj = new myPluginKickstart(this, settings);
				$this.data(namespace, obj);
			});
		},
		// public show method
		show: function() {
			return this.each(function() {
				var $this = $(this);
				var obj = $this.data(namespace);
				obj.show();
			});
		},
		// public hide method
		hide: function() {
			return this.each(function() {
				var $this = $(this);
				var obj = $this.data(namespace);
				obj.hide();
			});
		},
		// public update method
		update: function(content) {
			return this.each(function() {
				var $this = $(this);
				var obj = $this.data(namespace);
				obj.update(content);
			});
		},
		// public destroy method
		destroy: function() {
			return this.each(function() {
				var $this = $(this);
				var obj = $this.data(namespace);
				obj.destroy();
				delete obj;
				$this.removeData(namespace);
			});
		}
	};

	// plugin association, code from http://docs.jquery.com/Plugins/Authoring
	$.fn.pluginKickstart = function(method) {

		// Method calling logic
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.pluginKickstart');
		}

	};

})(jQuery);
