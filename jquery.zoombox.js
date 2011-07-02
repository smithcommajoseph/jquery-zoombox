/*!
	* Copyright © 2011 Legwork. All Rights Reserved.
	*
	* Dependencies:
	* jQuery 1.4+ (jquery.com)
	*
*/

(function($){
	
	var ver = '1.1',
		
	methods = {
		init: function(options){
			return this.each(function(){
				var $trigger = $(this),
					params = $.extend({}, $.fn.zoombox.defaults, options);
					
				$trigger.data('zoomboxOptions', params)
						.data('zoomboxState', 'closed')
						.data('zoomboxTarget', params.containerIdPre+'-'+Math.floor(Math.random()*10000)+Math.floor(Math.random()*100));
				
				_binds(params, $trigger);
				
			});
		},
		open: function($selector){
			$selector.click();
		},
		close: function(){
			var $zbContainer = arguments[1] ? $(arguments[1]) : $($.fn.zoombox.defaults.containerIdPre);
			return this.each(function(index){
				var $trigger = $(this),
					params = {};
					
				if(index === 0){
					params = $trigger.data('zoomboxOptions');
					
					_zoomClose($trigger);
				}
			});
		},
		
		destroy: function(){
			var $zbContainer = arguments[1] ? $(arguments[1]) : $($.fn.zoombox.defaults.containerIdPre);
			return this.each(function(index){
				var $trigger = $(this),
					params = $trigger.data('zoomboxOptions');
					
				if(index === 0){
					_unBinds($trigger, params);
					$trigger.data('zoomboxOptions', {});
					$zbContainer.remove();
				}
			});
		}
	};
	
	function _binds(params, $trigger){
		
		$trigger.bind('click.zoomboxEvents', function(e){
			e.preventDefault();
			if($trigger.data('zoomboxState') == 'closed'){
				_zoomOpen($trigger, e);
			} else {
				_zoomClose($trigger);
			}
		});
		
		if(params.containerCloseClass !== null){
			$($trigger.data('zoomboxTarget')+' '+params.containerCloseClass).live('click.zoomboxEvents', function(e){
				e.preventDefault();
				
				_zoomClose($trigger);
			});
		}
		
		if(params.closeWhenEsc === true){
			$(window).bind('keyup.zoomboxEvent', function(e){
				if(e.which == 27){
					_zoomClose($trigger);
				}
			});
		}
		
		if(params.closeWhenSelfIsNotClicked === true){
			$(window).bind('click.zoomboxEvents', function(e){
				var inZoombox = false,
					parents = $(e.target).parents();
				
				for(var prop in parents){
					if(parents[prop] === $($trigger.data('zoomboxTarget'))[0]) { inZoombox = true; }
				}
				if(inZoombox === false){
					_zoomClose($trigger);
				} 
			});
		}
	}
	
	function _unBinds($trigger, params){
		$trigger.unbind('.zoomboxEvents');
		$(params.containerCloseClass).unbind('.zoomboxEvents');
		$(window).unbind('.zoomboxEvents');
	}
	
	function _zoomOpen($trigger, e){
		if($trigger.data('zoomboxState') == 'closed'){
			var params = $trigger.data('zoomboxOptions'),
				zoomcalcs = _returnZoomcalcs(params, $trigger, e),
				$container = $('<div/>').attr('id', _deClassify($trigger.data('zoomboxTarget')))
										.attr('class', _deClassify(params.containerClass))
										.css(params.containerCSSMap);

			if(params.containerCloseClass !== null) {
				$container.append('<a class="'+_deClassify(params.containerCloseClass)+'" style="display: none;"/>');
			}
			
			$(params.containerParent).append($container);
			$($trigger.data('zoomboxTarget')).css(zoomcalcs.startmap);

			if(params.preOpen != null){ params.preOpen(e); }
			
			_animate();

			function _animate(){
			    $($trigger.data('zoomboxTarget')).css('opacity', '1')
										.animate(zoomcalcs.animapGrow, 
											params.zoomboxAnimationSpeed, 
											params.zoomboxEasing, 
											function(){
								    			$trigger.data('zoomboxState', 'open');
												if(params.containerCloseClass !== null) { 
													$($trigger.data('zoomboxTarget')+' '+params.containerCloseClass).fadeIn(); 
												}
												if(params.openCallback !== null) { params.openCallback(e); }
											});
			}
		}
	}
	
	function _zoomClose($trigger){
		if($trigger.data('zoomboxState') == 'open'){
			var params = $trigger.data('zoomboxOptions'),
				zoomcalcs = _returnZoomcalcs(params, $trigger);
				
			// if($($trigger.data('zoomboxTarget')).data('zoomboxTrigger') == $trigger.data('zoomboxTarget')){
				
				if(params.containerCloseClass !== null) {
					$($trigger.data('zoomboxTarget')+' '+params.containerCloseClass).fadeOut('fast', function(){
						if(params.preClose != null){ params.preClose(); }
						_animate();
					});
				} else {
		 			if(params.preClose != null){ params.preClose(); }
					_animate();
				}

				function _animate(){
					$($trigger.data('zoomboxTarget')).animate(zoomcalcs.animapShrink, 
												params.zoomboxAnimationSpeed, 
												params.zoomboxEasing, 
												function(){
									    			$trigger.data('zoomboxState', 'closed');
													$($trigger.data('zoomboxTarget')).remove();
													$trigger.removeData('zoomcalcs');
													if(params.closeCallback !== null) { params.closeCallback(); }
												});
				}
			}
		// }
	}
	
	function _returnZoomcalcs(params, $trigger){
		var origin = {},
			zoomcalcs = {},
			animapLeft,
			animapTop,
			$trigger,
			e = (arguments[2] !== undefined) ? arguments[2] : undefined;
			
		if($trigger.data('zoomcalcs') === undefined) {
			
			if(params.growFromMouse === true) { origin.x = e.pageX; origin.y = e.pageY; }
			else if (params.growTagAttr !== undefined){
				var attrTxt = $(e.currentTarget).attr(params.growTagAttr);
				var attrArr = attrTxt.split(', ');
				
				origin.x = attrArr[0]; 
				origin.y = attrArr[1];
			} 
			else if (e !== undefined){ 
				var offset = $(e.currentTarget).position();
				origin.x = offset.left; 
				origin.y = offset.top;
			}
			
			animapLeft = (params.targetPosX !== undefined) ? params.targetPosX : origin.x - parseInt(params.targetWidth / 2, 10);
			animapTop = (params.targetPosY !== undefined) ? params.targetPosY : origin.y - parseInt(params.targetHeight / 2, 10);
			
			zoomcalcs.startmap = {left: origin.x+'px', top: origin.y+'px'};
			zoomcalcs.animapGrow = {left: animapLeft+'px', width: params.targetWidth, top: animapTop+'px', height: params.targetHeight};
			zoomcalcs.animapShrink = {left: origin.x+'px', width: '1px', top: origin.y+'px', height: '1px'};
			
			$trigger.data('zoomcalcs', zoomcalcs);
			
		} else {
			zoomcalcs = $trigger.data('zoomcalcs');
		}
		
		return zoomcalcs;
	}
	
	function _deClassify(str){
		if(str.indexOf('#') == 0 || str.indexOf('.') == 0){
			return str.slice(1);
		} else {
			return str;
		}
	}
	
	$.fn.zoombox = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error( 'Method ' + method + ' does not exist on jquery.zoombox' );
		}
	};
	
	$.fn.zoombox.ver = function() { return ver; };
	
	$.fn.zoombox.defaults = {
		containerIdPre:				"#zoombox-container",
		containerClass: 			".zoombox-container",
		containerCloseClass:		".zoombox-close",
		containerCSSMap:			{opacity: '0', width: '1px', height: '1px', position: 'absolute'},
		containerParent:			'body',
		closeWhenEsc:				true,
		closeWhenSelfIsNotClicked:	true,
		closeCallback:				null,
		growFromMouse:				false,
		growTagAttr:				undefined,
		openCallback:				null,
		preOpen: 					null,
		preClose: 					null,
		targetHeight:				'200',
		targetWidth:				'200',
		targetPosX: 				undefined,
		targetPosY: 				undefined,
		zoomboxEasing:				'swing',
		zoomboxAnimationSpeed:		'fast'
	};

})(jQuery);