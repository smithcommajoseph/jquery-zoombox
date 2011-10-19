$(document).ready(function(){
	
	$('#pony').zoombox({
		targetWidth: 600,
	    targetHeight: 540,
	    targetPosX: 68,
	    targetPosY: ($(window).height()-540)/2,
		containerParent: '#jie-main',
	    preOpen: function(e){
			var frag = '<div style="display:none;" id="pony-wrapper">\
							<h4>This here is a cool pony</h4>\
							<img src="imgs/cool-pony.jpg" alt="cool pony" />\
						</div>';
			
			$( $(e.currentTarget).data('zbxTarget') ).append(frag);
	    },
	    onOpened: function(e){
	      $($(e.currentTarget).data('zbxTarget')).find('#pony-wrapper').fadeIn();
	    },
	    preClose: function(e){
	      $($(e.currentTarget).data('zbxTarget')).find('#pony-wrapper').remove();
	    }
	});
	
});