/*!
	* Copyright © 2011 Legwork. All Rights Reserved.
	*
	* Dependencies:
	* jQuery 1.4+ (jquery.com)
	*
*/

(function($){
	
	var ver = '1.0',
	
	$zbContainer,
	$zbClose,
	openedBy,
	
	_binds = function(params, $trigger, index){
		
		$trigger.bind('click.zoomboxEvents', function(e){
			e.preventDefault();
			
			if($zbContainer.hasClass('inactive')){
				_zoomOpen($trigger, e);
			} else {
				_zoomClose('opendBy');
			}
		});
		
		if(index === 0 && params.containerCloseId !== null){
			$zbClose.bind('click.zoomboxEvents', function(e){
				e.preventDefault();
				
				_zoomClose('opendBy');
			});
		}
		
		if(params.closeWhenEsc === true && index === 0){
			$(window).bind('keyup.zoomboxEvent', function(e){
				if(e.which == 27){
					_zoomClose('opendBy');
				}
			});
		}
		
		if(params.closeWhenSelfIsNotClicked === true && index === 0){
			$(params.containerParent).bind('click.zoomboxEvents', function(e){
				var inZoombox = false,
					parents = $(e.target).parents();
				
				for(var prop in parents){
					if(parents[prop] === $zbContainer[0]) { inZoombox = true; }
				}
				
				if($zbContainer.hasClass('active') && inZoombox === false){
 					_zoomClose('opendBy');
				} 
			});
		}
	},
	
	_unBinds = function($trigger){
		$trigger.unbind('.zoomboxEvents');
		$zbClose.unbind('.zoomboxEvents');
		$(window).unbind('.zoomboxEvents');
	},
	
	_zoomOpen = function($trigger, e){
		var params = $zbContainer.data('zoomboxOptions'),
			zoomcalcs = _returnZoomcalcs(params, $trigger, e);
			
		$zbContainer.css(zoomcalcs.startmap);
		
		if(params.preOpen != null){ params.preOpen(); }
		_animate();
		
		function _animate(){
		    $zbContainer.css('opacity', '1').animate(zoomcalcs.animapGrow, params.zoomboxAnimationSpeed, params.zoomboxEasing, function(){
    			$zbContainer.removeClass('inactive').addClass('active');

    			if(params.containerCloseId !== null) { $zbClose.fadeIn(); }
    			if(params.openCallback !== null) { params.openCallback(e); }
    		});
		}
	},
	
	_zoomClose = function($trigger){
		var params = $zbContainer.data('zoomboxOptions'),
			zoomcalcs = _returnZoomcalcs(params, $trigger);
			
		if(params.containerCloseId !== null) {
			$zbClose.fadeOut('fast', function(){
				if(params.preClose != null){ params.preClose(); }
				_animate();
			});
		} else {
 			if(params.preClose != null){ params.preClose(); }
			_animate();
		}
		
		function _animate(){
			$zbContainer.animate(zoomcalcs.animapShrink, params.zoomboxAnimationSpeed, params.zoomboxEasing, function(){
				$zbContainer.removeClass('active').addClass('inactive').css('opacity', '0');
				
				if(params.closeCallback !== null) { params.closeCallback(); }
			});
		}
	},
	
	_returnZoomcalcs = function(params){
		var origin = {},
			zoomcalcs = {},
			animapLeft,
			animapTop,
			$trigger,
			e = (arguments[2] !== undefined) ? arguments[2] : undefined;
			
			if(typeof arguments[1] == 'object') { $trigger = arguments[1]; openedBy = $trigger; }
			else if(arguments[1] == 'opendBy'){ $trigger = openedBy; }
			
		if($trigger.data('zoomcalcs') === undefined) {
			
			if(params.growFromMouse === true) { origin.x = e.pageX; origin.y = e.pageY; }
			else if (params.growFromTagAttr === true && params.growTagAttr !== undefined){
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
	},
	
	methods = {
		init: function(options){
			return this.each(function(index){
				var $trigger = $(this),
					params = $.extend($.fn.zoombox.defaults, options),
					$container = $('<div/>').attr('id', params.containerId);
				
			if(index === 0){
				$(params.containerParent).append($container);
				$zbContainer = $('#'+params.containerId);
				
				$zbContainer.data('zoomboxOptions', params).addClass('inactive').css(params.containerCSSMap);
				
				if(params.containerCloseId !== null) {
					$zbContainer.append('<a id="'+params.containerCloseId+'" style="display: none;"/>');
					$zbClose = $('#'+params.containerCloseId);
				}
			}
				
				_binds(params, $trigger, index);
				
			});
		},
		open: function($selector){
			$selector.click();
		},
		
		close: function(){
			if($zbContainer.length >= 1){ $zbContainer = (arguments[1]) ? $(arguments[1]) : $('#'+$.fn.zoombox.defaults.containerId); }
			return this.each(function(index){
				var $trigger = $(this),
					params = {};
					
				if(index === 0){
					params = $zbContainer.data('zoomboxOptions');
					
					_zoomClose('opendBy');
				}
			});
		},
		
		destroy: function(){
			if($zbContainer.length >= 1){ $zbContainer = (arguments[1]) ? $(arguments[1]) : $('#'+$.fn.zoombox.defaults.containerId); }
			return this.each(function(index){
				var $trigger = $(this),
					params = {};
					
				if(index === 0){
					params = $zbContainer.data('zoomboxOptions');
					
					_unBinds($trigger);
					$zbContainer.remove();
					if(params.containerCloseId !== null) { $zbClose.remove(); }
				}
			});
		}
	};
	
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
		containerId:				"zoombox-container",
		containerCloseId:			"zoombox-close",
		containerCSSMap:			{opacity: '0', width: '1px', height: '1px', position: 'absolute'},
		containerParent:			'body',
		closeWhenEsc:				true,
		closeWhenSelfIsNotClicked:	true,
		closeCallback:				null,
		growFromMouse:				false,
		growFromTagAttr:			false,
		growTagAttr:				undefined,
		openCallback:				null,
		preOpen: 					null,
		preClose: 					null,
		targetHeight:				'200',
		targetWidth:				'400',
		targetPosX: 				undefined,
		targetPosY: 				undefined,
		zoomboxEasing:				'swing',
		zoomboxAnimationSpeed:		'fast'
	};

})(jQuery);