/*!
    * Copyright © 2011 Legwork. All Rights Reserved.
    *
    * Dependencies:
    * jQuery 1.4+ (jquery.com)
    *
*/

(function($){
    
    var ver = '1.0',
    
    _binds = function(params, $trigger){
        $trigger.bind('click.zoomboxEvents', function(e){
            e.preventDefault();

            var o = _calcGrowPoint(e, params),
                $zc = $('#'+params.containerId),
                startmap = {'left': o.x+'px', 'top': o.y+'px'},
                animapLeft = (params.targetPosX !== undefined) ? params.targetPosX : o.x - parseInt(params.targetWidth / 2, 10),
                animapTop = (params.targetPosY !== undefined) ? params.targetPosY : o.y - parseInt(params.targetHeight / 2, 10),
                animapGrow = {left: animapLeft+'px', width: params.targetWidth, top: animapTop+'px', height: params.targetHeight},
                animapShrink = {left: o.x+'px', width: '1px', top: o.y+'px', height: '1px', opacity: '0'};
            
            if($zc.hasClass('inactive')){
                $zc.css(startmap);
                
                $zc.css('opacity', '1').animate(animapGrow, params.zoomboxAnimationSpeed, params.zoomboxEasing, function(){
                    $zc.removeClass('inactive').addClass('active');
                });
            } else {
                $zc.animate(animapShrink, params.zoomboxAnimationSpeed, params.zoomboxEasing, function(){
                    $zc.removeClass('active').addClass('inactive');
                });
            }
        });
    },
    
    _unBinds = function(){
        
    },
    
    _setData = function(){
        $(window).data('test', 'im the test data string');
    },
    
    _calcGrowPoint = function(e, params){
        var o = {};
        
        if($(this).data('zoomcalcs') === undefined) {
                        
            if(params.growFromMouse) { o.x = e.pageX; o.y = e.pageY; }
            // some stubbed stuff here for optional growth from a set point, would need to set context here as well for classes
            // may not actually get implemented
            // else if (params.growFromPoint !== undefined ){ o.x = params.growFromPoint; o.y = params.growFromPoint } 
            else { 
                var offset = $(e.currentTarget).position();
                o.x = offset.left; 
                o.y = offset.top;
            }
            
            $(this).data('zoomcalcs', o);
        } else {
            o = $(this).data('zoomcalcs');
        }
        
        return o;
    },
    
    _quickGrow = function(){
        
    },
    
    methods = {
        init: function(options){
            return this.each(function(){
                var $trigger = $(this),
                    params = $.extend($.fn.zoombox.defaults, options),
                    $div = $('<div id="'+params.containerId+'" class="inactive"/>').css({'background-color': 'green',  'opacity': '0', 'width': '1px', 'height': '1px', 'position': 'absolute'});
                    
                $(params.containerParent).append($div);
                
                _binds(params, $trigger);
                
            });
        },
        open: function(){
            return this.each(function(){
                console.log('inside open return');
                
            });
        },
        
        close: function(){
            return this.each(function(){
                var $trigger = $(this),
                params = $.extend($.fn.zoombox.defaults, options),
                $zc = $('#'+params.containerId);
                
            });
        },
        
        destroy: function(){
            return this.each(function(){
                console.log('inside destroy return');
                
                _unBinds($trigger);
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
        containerParent:            'body',
        closeWhenEsc:               true,
        closeWhenSelfIsNotClicked:  true,
        growFromMouse:              true,
        growFromPoint:              undefined,
        showCloseBtn:               true,
        targetHeight:               '200',
        targetWidth:                '400',
        targetPosX:                 undefined,
        targetPosY:                 undefined,
        zoomboxEasing:              'swing',
        zoomboxAnimationSpeed:      'fast'
    };
    
})(jQuery);

//('.map-feature-link').zoombox();