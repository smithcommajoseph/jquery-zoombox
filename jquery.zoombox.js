/*!
    * Copyright © 2011 Legwork. All Rights Reserved.
    *
    * Dependencies:
    * jQuery 1.4+ (jquery.com)
    *
*/

(function($){
    
    var ver = '1.0',
    
    $trigger,
    $zbContainer,
    $zbClose,
    
    _binds = function(params, $trigger){
            
        $trigger.bind('click.zoomboxEvents', function(e){
            e.preventDefault();
            
            if($zbContainer.hasClass('inactive')){
                _zoomOpen(e);
            } else {
                _zoomClose(e);
            }
        });
        
        $zbClose.bind('click.zoomboxEvents', function(e){
            e.preventDefault();
            var zoomcalcs = _returnZoomcalcs(e, params);
            
            _zoomClose(e);
        });
    },
    
    _unBinds = function(){
        $trigger.unbind('.zoomboxEvents');
        $zbClose.unbind('.zoomboxEvents');
    },
    
    _zoomOpen = function(e){
        var params = $zbContainer.data('zoomboxOptions'),
            zoomcalcs = _returnZoomcalcs(e, params);
            
        $zbContainer.css(zoomcalcs.startmap);
        
        $zbContainer.css('opacity', '1').animate(zoomcalcs.animapGrow, params.zoomboxAnimationSpeed, params.zoomboxEasing, function(){
            $zbContainer.removeClass('inactive').addClass('active');
            $zbClose.fadeIn();
            
            if(params.openCallback !== null) { params.openCallback(); }
        });
    },
    
    _zoomClose = function(e){
        var params = $zbContainer.data('zoomboxOptions'),
            zoomcalcs = _returnZoomcalcs(e, params);
                    
        $zbClose.fadeOut('fast', function(){
            $zbContainer.animate(zoomcalcs.animapShrink, params.zoomboxAnimationSpeed, params.zoomboxEasing, function(){
                $zbContainer.removeClass('active').addClass('inactive').css('opacity', '0');

                if(params.closeCallback !== null) { params.closeCallback(); }
            });
        });
    },
    
    _returnZoomcalcs = function(e, params){
        var origin = {},
            zoomcalcs = {},
            animapLeft,
            animapTop;
        
        if($(this).data('zoomcalcs') === undefined) {
            
            if(params.growFromMouse == true) { origin.x = e.pageX; origin.y = e.pageY; }
            else if (params.growFromTagAttr == true && params.growTagAttr !== undefined){
                attrTxt = $(e.currentTarget).attr(params.growTagAttr);
                attrArr = attrTxt.split(', ');
                
                origin.x = attrArr[0]; 
                origin.y = attrArr[1];
            } 
            else { 
                var offset = $(e.currentTarget).position();
                origin.x = offset.left; 
                origin.y = offset.top;
            }
            
            animapLeft = (params.targetPosX !== undefined) ? params.targetPosX : origin.x - parseInt(params.targetWidth / 2, 10);
            animapTop = (params.targetPosY !== undefined) ? params.targetPosY : origin.y - parseInt(params.targetHeight / 2, 10);
            
            zoomcalcs.startmap = {left: origin.x+'px', top: origin.y+'px'};
            zoomcalcs.animapGrow = {left: animapLeft+'px', width: params.targetWidth, top: animapTop+'px', height: params.targetHeight};
            zoomcalcs.animapShrink = {left: origin.x+'px', width: '1px', top: origin.y+'px', height: '1px'};
            
            $(this).data('zoomcalcs', zoomcalcs);
            
        } else {
            zoomcalcs = $(this).data('zoomcalcs');
        }
        
        return zoomcalcs;
    },
    
    methods = {
        init: function(options){
            return this.each(function(){
                var $trigger = $(this),
                    params = $.extend($.fn.zoombox.defaults, options),
                    $container = $('<div/>').attr('id', params.containerId)
                                            .addClass('inactive')
                                            .css(params.containerCSSMap),
                    $containerCloser = $('<a id="'+params.containerCloseId+'"/>').css('display', 'none');
                
                $container.append($containerCloser).data('zoomboxOptions', params);
                $(params.containerParent).append($container);
                
                $zbContainer = $('#'+params.containerId);
                $zbClose = $('#'+params.containerCloseId);
                
                _binds(params, $trigger);
                
            });
        },
        open: function($selector){
            return this.each(function(){
                var $trigger = $(this),
                params = params || $zbContainer.data('zoomboxOptions');
                
                $selector.click();
            });
        },
        
        close: function(){
            return this.each(function(){
                var $trigger = $(this),
                params = params || $zbContainer.data('zoomboxOptions'),
                e;
                                
                _zoomClose(e);
            });
        },
        
        destroy: function(){
            return this.each(function(){
                _unBinds();
                $zbContainer.remove();
                $zbClose.remove();
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
        containerId:                "zoombox-container",
        containerCloseId:           "zoombox-close",
        containerCSSMap:            {opacity: '0', width: '1px', height: '1px', position: 'absolute'},
        containerParent:            'body',
        closeWhenEsc:               true,
        closeWhenSelfIsNotClicked:  true,
        closeCallback:              null, 
        growFromMouse:              false,
        growFromTagAttr:            false,
        growTagAttr:                undefined,
        openCallback:               null,
        showCloseBtn:               true,
        targetHeight:               '200',
        targetWidth:                '400',
        targetPosX:                 undefined,
        targetPosY:                 undefined,
        zoomboxEasing:              'swing',
        zoomboxAnimationSpeed:      'fast'
    };
    
})(jQuery);