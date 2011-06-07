(function($){
    //some vars
    var 
    zoomboxSetup = function(){
        
    },
    zoomboxTeardown = function(){
        
    };
    
    
    $(document).ready(function(){
        
       module('Defaults');
       
       test('Defaults ob and props', function(){
           
           expect(19);
           
           //does the defaults object exist
           equals(typeof $.fn.zoombox.defaults, 'object', '$.fn.zoombox.defaults should be an object');

           //how many defaults are there?
           var expected = 17,
               actual = 0,
               prop;

           for(prop in $.fn.zoombox.defaults){
               if($.fn.zoombox.defaults.hasOwnProperty(prop)) { actual++; }
           }

           equals(expected, actual, 'There should be '+expected+' defaults');

           //are the defaults what we think they should be?
           equals(typeof $.fn.zoombox.defaults.containerId, 'string', '$.fn.zoombox.defaults.containerId should exist and be typeof "string"');
           equals(typeof $.fn.zoombox.defaults.containerCloseId, 'string', '$.fn.zoombox.defaults.containerCloseId should exist and be typeof "string"');
           equals(typeof $.fn.zoombox.defaults.containerCSSMap, 'object', '$.fn.zoombox.defaults.containerCSSMap should exist and be typeof "object"');
           equals(typeof $.fn.zoombox.defaults.containerParent, 'string', '$.fn.zoombox.defaults.containerParent should exist and be typeof "string"');
           equals(typeof $.fn.zoombox.defaults.closeWhenEsc, 'boolean', '$.fn.zoombox.defaults.closeWhenEsc should exist and be typeof "boolean"');
           equals(typeof $.fn.zoombox.defaults.closeWhenSelfIsNotClicked, 'boolean', '$.fn.zoombox.defaults.closeWhenSelfIsNotClicked should exist and be typeof "boolean"');
           equals(typeof $.fn.zoombox.defaults.closeCallback, 'object', '$.fn.zoombox.defaults.closeCallback should exist and be typeof "object"');
           equals(typeof $.fn.zoombox.defaults.growFromMouse, 'boolean', '$.fn.zoombox.defaults.growFromMouse should exist and be typeof "boolean"');
           equals(typeof $.fn.zoombox.defaults.growFromTagAttr, 'boolean', '$.fn.zoombox.defaults.growFromTagAttr should exist and be typeof "boolean"');
           equals(typeof $.fn.zoombox.defaults.growTagAttr, 'undefined', '$.fn.zoombox.defaults.growTagAttr should exist and be typeof "undefined"');
           equals(typeof $.fn.zoombox.defaults.openCallback, 'object', '$.fn.zoombox.defaults.openCallback should exist and be typeof "object"');
           equals(typeof $.fn.zoombox.defaults.targetHeight, 'string', '$.fn.zoombox.defaults.targetHeight should exist and be typeof "string"');
           equals(typeof $.fn.zoombox.defaults.targetWidth, 'string', '$.fn.zoombox.defaults.targetWidth should exist and be typeof "string"');
           equals(typeof $.fn.zoombox.defaults.targetPosX, 'undefined', '$.fn.zoombox.defaults.targetPosX should exist and be typeof "undefined"');
           equals(typeof $.fn.zoombox.defaults.targetPosY, 'undefined', '$.fn.zoombox.defaults.targetPosY should exist and be typeof "undefined"');
           equals(typeof $.fn.zoombox.defaults.zoomboxEasing, 'string', '$.fn.zoombox.defaults.zoomboxEasing should exist and be typeof "string"');
           equals(typeof $.fn.zoombox.defaults.zoomboxAnimationSpeed, 'string', '$.fn.zoombox.defaults.zoomboxAnimationSpeed should exist and be typeof "string"');

       });
       
       module('Zoombox Functionality', {setup: zoomboxSetup, teardown: zoomboxTeardown});
       
       test();
        
    });
})(jQuery)