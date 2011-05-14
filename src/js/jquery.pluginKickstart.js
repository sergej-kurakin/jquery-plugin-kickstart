(function($) {

	var namespace = 'pluginKickstart';

    // plugin class that does all work
    function myPluginKickstart(obj, settings) {
        this.settings = settings;
		this.obj = obj; // actual DOM element
        this.$obj = $(obj); // jQuery version of DOM element
        this.animate = false;
        this.animateIntervalId = 0;

        this.settings.inside++;

        // does nothing except console and increment
        this.show = function() {
            this.settings.inside++;
            console.log('show');
            this.showTest();
        };

        // does nothing except console and increment, changes text of the binded object
        this.hide = function() {
            this.settings.inside++;
            console.log('hide');
            this.showTest();
            this.$obj.text('Hide!' + this.settings.text);
        };

        // update content of the settings.text and changes text of the binded object
        this.update = function(content) {
            this.settings.inside++;
            console.log('update');
            this.showTest();
            this.settings.text = content;
            this.showTest();
            this.$obj.text('Update! ' + this.settings.text);

        };

        // just a function to do same every time
        this.showTest = function() {
            console.log('test: ' + this.settings.text + ' inside: ' + this.settings.inside);
        };

        // method called on mouse click
        this.click = function() {
            this.settings.inside++;
            this.$obj.css('color', 'red');
            this.showTest();
        }

        // method called on mouseover: starts animation with interval
        this.over = function() {
            this.settings.inside++;
            this.showTest();
            this.animate = true;

            var intervalObj = this;

            this.animateIntervalId = setInterval(function() {
                intervalObj.animateObj();
            },
            100);
        }

        // method called on mouseout, stops animation
        this.out = function() {
            this.settings.inside++;
            this.showTest();
            this.animate = false;
            clearInterval(this.animateIntervalId);
        }

        // just do anmation
        this.animateObj = function() {
            if (this.animate) {
                this.$obj.css('color', this.randomColor());
            }
        }

        // collor randomaizer
        this.randomColor = function() {
            function c() {
                return Math.floor(Math.random() * 256).toString(16);
            }
            return "#" + c() + c() + c();
        }

        // should destroy objects, done to test unbind
        this.destroy = function() {
            if (this.animate) {
                this.animate = false;
                clearInterval(this.animateIntervalId);
            }
            this.$obj.unbind('.' + namespace);
            delete this.$obj;
        }

        // event binder inside method
        this.bindEvents = function() {
            var mySelf = this;

            this.$obj.bind('click.' + namespace,
            function() {
                mySelf.click();
            });

            this.$obj.bind('mouseover.' + namespace,
            function() {
                console.log('over');
                mySelf.over();
            });

            this.$obj.bind('mouseout.' + namespace,
            function() {
                console.log('out');
                mySelf.out();
            });
        }

        this.bindEvents();

        console.log('init');
        this.showTest();

    }

    // methods that are available public
    var methods = {
        // public initiation with settings
        init: function(options) {

            return this.each(function() {

                // default settings for plugin
                var settings = {
                    'text': 'top',
                    'inside': 0
                };

                // extending with options
                if (options) {
                    $.extend(settings, options);
                }

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

    // plugin association
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
