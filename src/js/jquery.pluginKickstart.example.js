(function($) {

	var namespace = 'pluginKickstart';

	// plugin class that does all work
	function myPluginKickstart(obj, settings) {

		var base = this;

		// default settings for plugin
		base.settings = {
			'defaultText': 'top',
			'inside': 0
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
			base.animate = false;
			base.animateIntervalId = 0;

			base.settings.inside++;

			base.bindEvents();
		};

		// does nothing except increment
		base.show = function() {
			base.settings.inside++;
		};

		// does nothing except increment, changes text of the binded object
		base.hide = function() {
			base.settings.inside++;
			base.$obj.text('Hide!' + base.settings.defaultText);
		};

		// update content of the settings.text and changes text of the binded object
		base.update = function(content) {
			base.settings.inside++;
			base.settings.text = content;
			base.$obj.text('Update! ' + base.settings.defaultText);

		};

		// method called on mouse click
		base.click = function() {
			base.settings.inside++;
			base.$obj.css('color', 'red');
		};

		// method called on mouseover: starts animation with interval
		base.over = function() {
			base.settings.inside++;
			base.animate = true;

			base.animateIntervalId = setInterval(function() {
				base.animateObj();
			},
			100);
		};

		// method called on mouseout, stops animation
		base.out = function() {
			base.settings.inside++;
			base.animate = false;
			clearInterval(base.animateIntervalId);
		};

		// just do anmation
		base.animateObj = function() {
			if (base.animate) {
				base.$obj.css('color', base.randomColor());
			}
		};

		// collor randomaizer
		base.randomColor = function() {
			function c() {
				return Math.floor(Math.random() * 256).toString(16);
			}
			return "#" + c() + c() + c();
		};

		// should destroy objects, done to test unbind
		base.destroy = function() {
			if (base.animate) {
				base.animate = false;
				clearInterval(base.animateIntervalId);
			}
			base.$obj.unbind('.' + namespace);
		};

		// event binder inside method
		base.bindEvents = function() {

			base.$obj.bind('click.' + namespace,
				function() {
					base.click();
				});

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
		// show method
		show: function() {
			return this.each(function() {
				var $this = $(this);
				var obj = $this.data(namespace);
				obj.show();
			});
		},
		// hide method
		hide: function() {
			return this.each(function() {
				var $this = $(this);
				var obj = $this.data(namespace);
				obj.hide();
			});
		},
		// update method
		update: function(content) {
			return this.each(function() {
				var $this = $(this);
				var obj = $this.data(namespace);
				obj.update(content);
			});
		},
		// destroy method
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