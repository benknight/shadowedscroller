(function($){

	$.fn.shadowedScroller = function(options) {

		return this.each(function() {

			options = $.extend({
				shadow_size: 30,
				shadow_color: 'black',
				height: 200
			}, options);

			var $this = $(this),
				container = $([
					'<div class="ss-container">',
						'<div class="ss-top"></div>',
						'<div class="ss-content">',
							'<div class="ss-inner"></div>',
						'</div>',
						'<div class="ss-bottom"></div>',
					'</div>'
				].join('')),
				top     = container.find('.ss-top'),
				content = container.find('.ss-content'),
				inner   = container.find('.ss-inner'),
				bottom  = container.find('.ss-bottom');

			var hardInOut = function(val) {
				return 4 * Math.pow((val - 0.5), 3) + 0.5;
			};

			var setOpacity = function() {
				var h = inner.outerHeight() - content.innerHeight();
				var s = content.scrollTop();
				top.css({ 'opacity': hardInOut(s / h) });
				bottom.css({ 'opacity': hardInOut(1 - ( s / h )) });
			};

			// styles
			container.css({
				'position': 'relative',
				'overflow': 'hidden'
			});

			content.css({
				'overflow': 'auto',
				'height': options.height
			});

			var shadow_css = {
				'position': 'absolute',
				'z-index': '1',
				'width': '100%',
				'height': options.shadow_size,
				'border-radius': '50%',
				'box-shadow': '0 0 ' + options.shadow_size + 'px ' + options.shadow_color
			};

			top.css(shadow_css).css('top', -1 * options.shadow_size);
			bottom.css(shadow_css).css('bottom', -1 * options.shadow_size);

			content.bind('scroll', setOpacity );
			container.insertBefore($this);
			$this.appendTo(inner);
			setOpacity();
		});
	};
})(jQuery);