(function($){
	
	$(function(){
		$('#example-1').zoombox();
		
		$('.example-2').zoombox({
			containerId: '#zoombox-ex-2-container'
			// preOpen: function(){
			// 	$('#zoombox-ex-2-container').append('<p>Some Content here</p>');
			// }
		});

	});
	
	
	
})(jQuery);