(function($){
	
	$(function(){
		$('#example-1').zoombox();
		
		$('#example-2').zoombox({
			preOpen: function(e){
				$($(e.currentTarget).data('zoomboxTarget')).append('<p>Some Content here</p>');
			}
		});
		
		$('#example-3').zoombox({
			openCallback	: function(e){
				$($(e.currentTarget).data('zoomboxTarget')).append('<p>Some stuff here</p>');
			}
		});

	});
	
	
	
})(jQuery);