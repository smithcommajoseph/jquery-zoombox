/*!
	* Copyright © 2011 Legwork. All Rights Reserved.
	*
	* Dependencies:
	* jQuery 1.4+ (jquery.com)
	*
*/

(function($){
	
	var ver = '1.2',
		
		ID_PRE = "#zoombox-container",
		CONT_CLASS = "zoombox-container",
		CONT_CLOSER = "zoombox-close",
		OPTS = 'zoomboxOptions',
		STATE = 'zoomboxState',
		TARGET = 'zoomboxTarget';
		
	methods = {
		init: function(options){
			return this.each(function(){
				var $trigger = $(this),
					params = $.extend({}, $.fn.zoombox.defaults, options);
					
				$trigger.data(OPTS, params)
						.data(STATE, 'closed')
						.data(TARGET, ID_PRE+'-'+Math.floor(Math.random()*10000)+Math.floor(Math.random()*100));
				
				_binds(params, $trigger);
			});
		},
		open: function(){
			return this.each(function(){
				var $trigger = $(this);
				if($trigger.data(STATE) != 'open'){ $trigger.click(); }
			});
		},
		close: function(){
			return this.each(function(){
				var $trigger = $(this);
				if($trigger.data(STATE) != 'closed'){ $trigger.click(); }
			});
		},
		destroy: function(){
			var $zbContainer = arguments[1] ? $(arguments[1]) : $(ID_PRE);
			return this.each(function(index){
				var $trigger = $(this),
					params = $trigger.data(OPTS);
					
				if(index === 0){
					_unBinds($trigger, params);
					$trigger.data(OPTS, {});
					$zbContainer.remove();
				}
			});
		}
	};
	
	function _binds(params, $trigger){
		
		$trigger.bind('click.zoomboxEvents', function(e){
			e.preventDefault();
			if($trigger.data(STATE) == 'closed'){
				_zoomOpen($trigger, e);
			} else {
				_zoomClose($trigger, e);
			}
		});
		
		if(params.closeBtn === true){
			$($trigger.data(TARGET)+' .'+CONT_CLOSER).live('click.zoomboxEvents', function(e){
				e.preventDefault();
				if($trigger.data(STATE) != 'closed'){ $trigger.click(); }	
			});
		}
		
		if(params.closeWhenEsc === true){
			$(window).bind('keyup.zoomboxEvent', function(e){
				if(e.which == 27){
					if($trigger.data(STATE) != 'closed'){ $trigger.click(); }
				}
			});
		}
	}
	
	function _winBind(e){
		$(window).unbind('.zoomboxEvents');
		
		// var inZoombox = false,
		// 	parents = $(e.target).parents();
		// 	
		// console.log($('.'+CONT_CLASS));
		// 
		// for(var prop in parents){
		// 	if(parents[prop] === $($trigger.data(TARGET))[0]) { inZoombox = true; }
		// }
		// if(inZoombox === false){
		// 	console.log('winbind called');
		// 	console.log($trigger);
		// 	// if($trigger.data(STATE) != 'closed'){ $trigger.click(); }
		// } 
	}
	
	function _unBinds($trigger, params){
		$trigger.unbind('.zoomboxEvents');
		$('.'+CONT_CLOSER).unbind('.zoomboxEvents');
		$(window).unbind('.zoomboxEvents');
	}
	
	function _zoomOpen($trigger, e){
		if($trigger.data(STATE) == 'closed'){
			var params = $trigger.data(OPTS),
				zoomcalcs = _returnZoomcalcs(params, $trigger, e),
				$container = $('<div/>').attr('id', _deClassify($trigger.data(TARGET)))
										.attr('class', CONT_CLASS)
										.css(params.containerCSSMap);
			function _animate(){
			    $($trigger.data(TARGET))
						.css('opacity', '1')
						.animate(zoomcalcs.animapGrow, 
							params.speed, 
							params.easing, 
							function(){
				    			$trigger.data(STATE, 'open');
								if(params.closeBtn === true) { 
									$($trigger.data(TARGET)+' .'+CONT_CLOSER).fadeIn(); 
								}
								if(params.closeIfNotSelf === true){
									$(window).bind('click.zoomboxEvents', _winBind);
								}
								if(params.onOpened !== null) { params.onOpened(e); }
							});
			}
			
			if(params.closeBtn === true) {
				$container.append('<a class="'+CONT_CLOSER+'" style="display: none;"/>');
			}
			
			$(params.containerParent).append($container);
			$($trigger.data(TARGET)).css(zoomcalcs.startmap);

			if(params.preOpen != null){ params.preOpen(e); }
			
			_animate();
		}
	}
	
	function _zoomClose($trigger, e){
		if($trigger.data(STATE) == 'open'){
			var params = $trigger.data(OPTS),
				zoomcalcs = _returnZoomcalcs(params, $trigger);
			
			function _animate(){
				$($trigger.data(TARGET))
					.animate(zoomcalcs.animapShrink, 
						params.speed, 
						params.easing, 
						function(){
			    			$trigger.data(STATE, 'closed');
							$($trigger.data(TARGET)).remove();
							$trigger.removeData('zoomcalcs');
							if(params.onClosed !== null) { params.onClosed(e); }
						});
			}	
				
			if(params.closeBtn === true) {
				$($trigger.data(TARGET)+' .'+CONT_CLOSER).fadeOut('fast', function(){
					if(params.preClose != null){ params.preClose(e); }
					_animate();
				});
			} else {
	 			if(params.preClose != null){ params.preClose(e); }
				_animate();
			}
		}

	}
	
	function _returnZoomcalcs(params, $trigger){
		var origin = {},
			zoomcalcs = {},
			animapLeft,
			animapTop,
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
		containerCSSMap:	{opacity: '0', width: '1px', height: '1px', position: 'absolute'},
		containerParent:	'body',
		closeBtn: 			true,
		closeWhenEsc:		true,
		closeIfNotSelf:		true,
		easing:				'swing',
		growFromMouse:		false,
		growTagAttr:		undefined,
		onClosed:			null,
		onOpened:			null,
		preOpen: 			null,
		preClose: 			null,
		speed:				'fast',
		targetHeight:		'200',
		targetWidth:		'200',
		targetPosX: 		undefined,
		targetPosY: 		undefined
	};

})(jQuery);