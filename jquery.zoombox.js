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
                animap = {'left': animapLeft+'px',width: params.targetWidth,'top': animapTop+'px',height: params.targetHeight};
            
            $zc.css(startmap);
            
            if($zc.hasClass('inactive')){
                $zc.css('opacity', '1').animate(animap, params.zoomboxAnimationSpeed, params.zoomboxEasing, function(){
                    $zc.addClass('active');
                });
            } else {

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
        
        if(params.growFromMouse) { o.x = e.pageX; o.y = e.pageY; }
        else { 
            var offset = $(e.target).offset();
            o.x = offset.left; 
            o.y = offset.top;
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
                    containerParent = (params.containerParent !== undefined) ? params.containerParent : 'body',
                    $div = $('<div id="'+params.containerId+'" class="inactive"/>').css({'background-color': 'green',  'opacity': '0', 'width': '1px', 'height': '1px', 'position': 'absolute'});
                    
                $(containerParent).append($div);
                
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
                console.log('inside close return');
                
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
        containerParent:            undefined,
        closeWhenEsc:               true,
        closeWhenSelfIsNotClicked:  true,
        growFromMouse:              true,
        growFromPoint:              'the click selector or somesuch',
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