(function($){
	
	$(function(){
		$('#example-1').zoombox();
		
		$('#example-2').zoombox({
			preOpen: function(e){
				$($(e.currentTarget).data('zoomboxTarget')).append('<p>Some Content here</p>');
			}
		});
		
		$('#example-3').zoombox({
			preOpen: function(e){
				$($(e.currentTarget).data('zoomboxTarget')).append('<p style="display:none;">I was hidden but now i\'m visible</p>');
			},
			onOpened: function(e){
				$($(e.currentTarget).data('zoomboxTarget')).find('p').fadeIn();
			}
		});
		
		$('#example-4').zoombox({
			preOpen: function(e){
				$($(e.currentTarget).data('zoomboxTarget')).append('<p style="display:none;">I was lost but now i\'m found, and then i\'ll be lost again</p>');
			},
			onOpened: function(e){
				$($(e.currentTarget).data('zoomboxTarget')).find('p').fadeIn();
			},
			preClose: function(e){
				$($(e.currentTarget).data('zoomboxTarget')).find('p').remove();
			}
		});
		
		$('#example-5').zoombox({
			onClosed: function(e){
				alert('close callback fn fired');
			}
		});
		
		$('#example-6').zoombox({
			targetWidth: '100',
			targetHeight: '400'
		});
		
		$('#example-7').zoombox({
			targetPosX: '300',
			targetPosY: '0',
			containerParent: '#ex-7-offset-parent'
		});
		
		$('#example-8').zoombox({
			growFromMouse: true
		});
		
		$('#ex-9-offset-parent a').zoombox({
			growTagAttr: 'rel',
			containerParent: '#ex-9-offset-parent'
		});
		
	});
	
	
	
})(jQuery);