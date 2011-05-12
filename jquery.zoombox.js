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
            
            var o = _calcGrowPoint(),
                $zc = $('#'+params.zoomboxContainerId);
                
            $zc.css({'top': o.x+'px', 'left': o.x+'px'});
            if($zc.hasClass('inactive')){
                $zc.animate({
                    height: '200px',
                    width: '300px'
                }, 'fast');
            } else {
                
            }
        });
    },
    
    _unBinds = function(){
        
    },
    
    _setData = function(){
        $(window).data('test', 'im the test data string');
    },
    
    _calcGrowPoint = function(e){
        o = {};
        
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
                    $div = $('<div id="'+params.zoomboxContainerId+'" class="inactive"/>').css({'background-color': 'green', 'display': 'none', 'width': '1px', 'height': '1px', 'position': 'absolute'});
                    
                
                
                $('body').append($div);
                
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
        closeWhenEsc:               true,
        closeWhenSelfIsNotClicked:  true,
        growFromMouse:              false,
        growFromPoint:              'the click selector or somesuch',
        showCloseBtn:               true,
        zoomboxContainerId:         "zoombox-container"
    };
    
})(jQuery);

//('.map-feature-link').zoombox();