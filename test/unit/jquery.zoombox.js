(function($){
	//some vars
	var xYCoords = [230, 230],
	$anchor = $('<a />').attr({
								href: 'json_test.html',
								id: 'test-anchor',
								rel: xYCoords.join(', ')
								}).html('Anchor'),
	$button = $('<button />').attr({
								id: 'test-button',
								type: 'submit',
								zB: xYCoords.join(',')
								}).html('Button'),
	$submit = $('<input />').attr({
								id: 'test-submit',
								type: 'submit',
								zB: xYCoords.join(',')
								}).html('Input type=submit'),
	zoomboxAnchorSetup = function(){
		$('body').append($anchor);
	},
	zoomboxAnchorTeardown = function(){
		$('#test-anchor').zoombox('destroy');
		$('#test-anchor').remove();
	};

	$(document).ready(function(){
		
		module('Defaults');
		
		test('Defaults ob and props', function(){
			
			expect(21);
			
			//does the defaults object exist
			equals(typeof $.fn.zoombox.defaults, 'object', '$.fn.zoombox.defaults should be an object');
			
			//how many defaults are there?
			var expected = 19,
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
			equals(typeof $.fn.zoombox.defaults.preOpen, 'object', '$.fn.zoombox.defaults.openCallback should exist and be typeof "object"');
			equals(typeof $.fn.zoombox.defaults.preClose, 'object', '$.fn.zoombox.defaults.openCallback should exist and be typeof "object"');
			equals(typeof $.fn.zoombox.defaults.targetHeight, 'string', '$.fn.zoombox.defaults.targetHeight should exist and be typeof "string"');
			equals(typeof $.fn.zoombox.defaults.targetWidth, 'string', '$.fn.zoombox.defaults.targetWidth should exist and be typeof "string"');
			equals(typeof $.fn.zoombox.defaults.targetPosX, 'undefined', '$.fn.zoombox.defaults.targetPosX should exist and be typeof "undefined"');
			equals(typeof $.fn.zoombox.defaults.targetPosY, 'undefined', '$.fn.zoombox.defaults.targetPosY should exist and be typeof "undefined"');
			equals(typeof $.fn.zoombox.defaults.zoomboxEasing, 'string', '$.fn.zoombox.defaults.zoomboxEasing should exist and be typeof "string"');
			equals(typeof $.fn.zoombox.defaults.zoomboxAnimationSpeed, 'string', '$.fn.zoombox.defaults.zoomboxAnimationSpeed should exist and be typeof "string"');
		});

		module('Functionality (Anchor)', {setup: zoomboxAnchorSetup, teardown: zoomboxAnchorTeardown});
		
		test('Basic Setup (Pre-zoomed)', function(){
			
			expect(6);
			
			$('#test-anchor').zoombox();
			
			equals(typeof $('#zoombox-container'), 'object', 'Zoombox container should exist in the dom');
			equals($('#'+$.fn.zoombox.defaults.containerId).css('position'), 'absolute', 'Zoombox container position should be "absolute"');
			equals($('#'+$.fn.zoombox.defaults.containerId).css('width'), '1px', 'Zoombox container width should be "1px"');
			equals($('#'+$.fn.zoombox.defaults.containerId).css('height'), '1px', 'Zoombox container height should be "1px"');
			equals($('#'+$.fn.zoombox.defaults.containerId).css('opacity'), '0', 'Zoombox container opacity should be "0"');
			equals($('#'+$.fn.zoombox.defaults.containerId).hasClass('inactive'), true, 'Zoombox container should have the class "inactive"');
		});
		
		test('Basic Setup (Open)', function(){
			
			expect(6);
			
			stop();
			
			$('#test-anchor').zoombox({
				openCallback: function(){
					equals(typeof $('#zoombox-container'), 'object', 'Zoombox container should exist in the dom');
					equals($('#'+$.fn.zoombox.defaults.containerId).css('position'), 'absolute', 'Zoombox container position should be "absolute"');
					equals($('#'+$.fn.zoombox.defaults.containerId).css('width'), $.fn.zoombox.defaults.targetWidth+'px', 'Zoombox container width should be "'+$.fn.zoombox.defaults.targetWidth+'px"');
					equals($('#'+$.fn.zoombox.defaults.containerId).css('height'), $.fn.zoombox.defaults.targetHeight+'px', 'Zoombox container height should be "'+$.fn.zoombox.defaults.targetHeight+'px"');
					equals($('#'+$.fn.zoombox.defaults.containerId).css('opacity'), '1', 'Zoombox container opacity should be "1"');
					equals($('#'+$.fn.zoombox.defaults.containerId).hasClass('active'), true, 'Zoombox container should have the class "active"');
				
					start();
				}
			});
			
			$('#test-anchor').click();
			
		});
		
		test('preOpen Setup', function(){
			
			expect(1);
			
			stop();
			
			$('#test-anchor').zoombox({
				preOpen: function(){
					$('#zoombox-container').append('<div id="test-div" />');
				},
				openCallback: function(){
					equals(typeof $('#zoombox-container #test-div'), 'object', 'Test-Div container should exist in the dom');
					start();
				}
			});
			
			$('#test-anchor').click();
			
		});
		
		test('preClose Setup', function(){
			
			expect(1);
			
			stop();
			
			$('#test-anchor').zoombox({
				preClose: function(){
					$('#zoombox-container').append('<div id="test-div" />');
				},
				closeCallback: function(){
					equals(typeof $('#zoombox-container #test-div'), 'object', 'Test-Div container should exist in the dom');
					start();
				}
			});
			
			$('#test-anchor').click();
			
		});
		
		// test('relTag Setup', function(){
		// 	
		// 	expect(2);
		// 	
		// 	stop();
		// 	
		// 	$('#test-anchor').zoombox({
		// 		growFromTagAttr: true,
		// 		growTagAttr: 'rel',
		// 		closeCallback: function(){
		// 			equals(parseInt($('#zoombox-container').css('left'), 10), xYCoords[0], '#zoombox-container should = first rel tag val');
		// 			equals(parseInt($('#zoombox-container').css('top'), 10), xYCoords[1], '#zoombox-container should = second rel tag val');
		// 			
		// 			start();
		// 		}
		// 	});
		// 	
		// 	$('#test-anchor').click();
		// 	
		// });
		
	});
})(jQuery);