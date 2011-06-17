describe('Zoombox', function(){
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
								}).html('Input type=submit');
	
	//
	describe('Defaults', function(){
		it('should have Properties', function(){
			//does the defaults object exist
			expect(typeof $.fn.zoombox.defaults).toEqual('object');
			
			//how many defaults are there?
			var expected = 19,
				actual = 0,
				prop;
				
			for(prop in $.fn.zoombox.defaults){
				if($.fn.zoombox.defaults.hasOwnProperty(prop)) { actual++; }
			}
			
			expect(expected).toEqual(actual);
			
			//are the defaults what we think they should be?
			expect(typeof $.fn.zoombox.defaults.containerId).toEqual('string');
			expect(typeof $.fn.zoombox.defaults.containerCloseId).toEqual('string');
			expect(typeof $.fn.zoombox.defaults.containerCSSMap).toEqual('object');
			expect(typeof $.fn.zoombox.defaults.containerParent).toEqual('string');
			expect(typeof $.fn.zoombox.defaults.closeWhenEsc).toEqual('boolean');
			expect(typeof $.fn.zoombox.defaults.closeWhenSelfIsNotClicked).toEqual('boolean');
			expect(typeof $.fn.zoombox.defaults.closeCallback).toEqual('object');
			expect(typeof $.fn.zoombox.defaults.growFromMouse).toEqual('boolean');
			expect(typeof $.fn.zoombox.defaults.growFromTagAttr).toEqual('boolean');
			expect(typeof $.fn.zoombox.defaults.growTagAttr).toEqual('undefined');
			expect(typeof $.fn.zoombox.defaults.openCallback).toEqual('object');
			expect(typeof $.fn.zoombox.defaults.preOpen).toEqual('object');
			expect(typeof $.fn.zoombox.defaults.preClose).toEqual('object');
			expect(typeof $.fn.zoombox.defaults.targetHeight).toEqual('string');
			expect(typeof $.fn.zoombox.defaults.targetWidth).toEqual('string');
			expect(typeof $.fn.zoombox.defaults.targetPosX).toEqual('undefined');
			expect(typeof $.fn.zoombox.defaults.targetPosY).toEqual('undefined');
			expect(typeof $.fn.zoombox.defaults.zoomboxEasing).toEqual('string');
			expect(typeof $.fn.zoombox.defaults.zoomboxAnimationSpeed).toEqual('string');
		});
	});
	
	//
	describe('Anchors', function(){
		beforeEach(function(){
			$('body').append($anchor);
		});
		afterEach(function(){
			$('#test-anchor').zoombox('destroy');
			$('#test-anchor').remove();
		});
		
		it('should initalize', function(){
			$('#test-anchor').zoombox();
			
			expect(typeof $('#zoombox-container')).toEqual('object');
			expect($('#'+$.fn.zoombox.defaults.containerId).css('position')).toEqual('absolute');
			expect($('#'+$.fn.zoombox.defaults.containerId).css('width')).toEqual('1px');
			expect($('#'+$.fn.zoombox.defaults.containerId).css('height')).toEqual('1px');
			expect($('#'+$.fn.zoombox.defaults.containerId).css('opacity')).toEqual('0');
			expect($('#'+$.fn.zoombox.defaults.containerId).hasClass('inactive')).toBeTruthy();
			
		});
		
		it('should open', function(){
			var t = 0;
			$('#test-anchor').zoombox({
				openCallback: function(){
					t = 1;
				}
			});
			
			$('#test-anchor').click();
			
			waitsFor(function(){
				return t === 1;
			});
			
			runs(function(){
				expect(typeof $('#zoombox-container')).toEqual('object');
				expect($('#'+$.fn.zoombox.defaults.containerId).css('position')).toEqual('absolute');
				expect($('#'+$.fn.zoombox.defaults.containerId).css('width')).toEqual($.fn.zoombox.defaults.targetWidth+'px');
				expect($('#'+$.fn.zoombox.defaults.containerId).css('height')).toEqual($.fn.zoombox.defaults.targetHeight+'px');
				expect($('#'+$.fn.zoombox.defaults.containerId).css('opacity')).toEqual('1');
				expect($('#'+$.fn.zoombox.defaults.containerId).hasClass('active')).toBeTruthy();
			});
			
		});
		
		it('should close', function(){
			var t = 0;
			$('#test-anchor').zoombox({
				openCallback: function(){
					$('#test-anchor').click();
				},
				closeCallback: function(){
					t = 1;
				}
			});
			
			$('#test-anchor').click();
			
			waitsFor(function(){
				return t === 1;
			});
			
			runs(function(){
				expect(typeof $('#zoombox-container')).toEqual('object');
				expect($('#'+$.fn.zoombox.defaults.containerId).css('position')).toEqual('absolute');
				expect($('#'+$.fn.zoombox.defaults.containerId).css('width')).toEqual('1px');
				expect($('#'+$.fn.zoombox.defaults.containerId).css('height')).toEqual('1px');
				expect($('#'+$.fn.zoombox.defaults.containerId).css('opacity')).toEqual('0');
				expect($('#'+$.fn.zoombox.defaults.containerId).hasClass('inactive')).toBeTruthy();
			});
			
		});
		
		it('should fire a preOpen fn when defined', function(){
			var t = 0;
			$('#test-anchor').zoombox({
				preOpen: function(){
					$('#zoombox-container').append('<div id="test-div" />');
				},
				openCallback: function(){
					t = 1;
				}
			});
			
			$('#test-anchor').click();
			
			waitsFor(function(){
				return t === 1;
			});
			
			runs(function(){
				expect(typeof $('#zoombox-container #test-div')).toEqual('object');
			});
			
		});
		
		it('should fire a preClose fn when defined', function(){
			var t = 0;
			$('#test-anchor').zoombox({
				openCallback: function(){
					$('#test-anchor').click();
				},
				preClose: function(){
					$('#zoombox-container').append('<div id="test-div" />');
				},
				closeCallback: function(){
					t = 1;
				}
			});
			
			$('#test-anchor').click();
			
			waitsFor(function(){
				return t === 1;
			});
			
			runs(function(){
				expect(typeof $('#zoombox-container #test-div')).toEqual('object');
			});
			
		});
		
		it('should grow from a specified tag\'s attribute value', function(){
			var t = 0;
			
			$('#test-anchor').zoombox({
				growFromTagAttr: true,
				growTagAttr: 'rel',
				openCallback: null,
				openCallback: function(){
					$('#test-anchor').click();
				},
				closeCallback: function(){
					t = 1;
				}
			});
			
			$('#test-anchor').click();
			
			waitsFor(function(){
				return t === 1;
			});
			
			waits(1000);
			
			runs(function(){
				expect(parseInt($('#zoombox-container').css('left'), 10)).toEqual(xYCoords[0]);
				expect(parseInt($('#zoombox-container').css('top'), 10)).toEqual(xYCoords[1]);
			});
		});
		
		
	});
  
});