(function ($) {

	var namespace = 'pluginKickstart';

	// plugin class that does all work
	function myPluginKickstart(obj, settings) {

		var base = this;

		// default settings for plugin
		base.settings = {
			'defaultText': 'text'
		};

		// extending with settings parameter
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

		// public Something method
		base.showSomething = function () {
			// code for Something method
		};

		// public Something method
		base.hideSomething = function () {
			// code for Something method
		};

		// public updateData method
		base.updateData = function (content) {
			// code for updateData method using data from content parameter
		};

		// public destroy method
		base.destroy = function () {
			// code for object destruction
			
			// example of unbind call to unbind only events from this plugin
			base.$obj.unbind('.' + namespace);
		};

		// private method, used from within this plugin
		base.over = function () {
			base.$obj.css('color', 'red');
		};

		// private method, used from within this plugin
		base.out = function () {
			base.$obj.css('color', 'black');
		};

		// private method, used from within this plugin
		base.bindEvents = function () {
			base.$obj.bind('mouseenter.' + namespace,
				function () {
					base.over();
				});

			base.$obj.bind('mouseleave.' + namespace,
				function () {
					base.out();
				});
		};

		// calling init
		base.init();

	}

	// methods that are available public, most code taken from http://docs.jquery.com/Plugins/Authoring
	var methods = {
		// public initiation with settings
		init: function (settings) {
			return this.each(function () {
				var $this = $(this);
				// building object
				var obj = new myPluginKickstart(this, settings);
				$this.data(namespace, obj);
			});
		},
		// public showSomething method
		showSomething: function () {
			return this.each(function () {
				var $this = $(this);
				var obj = $this.data(namespace);
				obj.showSomething();
			});
		},
		// public hideSomething method
		hideSomething: function () {
			return this.each(function () {
				var $this = $(this);
				var obj = $this.data(namespace);
				obj.hideSomething();
			});
		},
		// public updateData method
		updateData: function (content) {
			return this.each(function () {
				var $this = $(this);
				var obj = $this.data(namespace);
				obj.updateData(content);
			});
		},
		// public destroy method
		destroy: function () {
			return this.each(function () {
				var $this = $(this);
				var obj = $this.data(namespace);
				obj.destroy();
				$this.removeData(namespace);
			});
		}
	};

	// plugin association, code from http://docs.jquery.com/Plugins/Authoring
	$.fn.pluginKickstart = function (method) {

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
