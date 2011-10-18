$(document).ready(function(){
	
	$('#pony').zoombox({
		targetWidth: 600,
	    targetHeight: 540,
	    targetPosX: 68,
	    targetPosY: 20,
		containerParent: '#jie-main',
	    preOpen: function(e){
			var frag = '<div style="display:none;" id="pony-wrapper">\
							<h4>This here is a cool pony</h4>\
							<img src="imgs/cool-pony.jpg" alt="cool pony" />\
						</div>';
			
			$( $(e.currentTarget).data('zoomboxTarget') ).append(frag);
	    },
	    openCallback: function(e){
	      $($(e.currentTarget).data('zoomboxTarget')).find('#pony-wrapper').fadeIn();
	    },
	    preClose: function(){
	      $('.zoombox-container').find('#pony-wrapper').remove();
	    }
	});
	
});