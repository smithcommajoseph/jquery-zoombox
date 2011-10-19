var Zb = Zb || {};

(function($){
	var self = this;
	
	self.Ex = (function(){
		var pub = {};
			
			
		pub.init = function(){
			_loadMap(); 
		};
		
		function _loadMap($ref) {
			var $container = $('#map-container'),
				canvas = document.createElement('canvas');
			
			canvas.setAttribute('width', 736);
			canvas.setAttribute('height', 350);
			document.getElementById('map-container').appendChild(canvas);
			
			if(!canvas.getContext) {
			    canvas = G_vmlCanvasManager.initElement(canvas);
			}
			
			$(canvas).css('position', 'absolute');
			
			var ctx = canvas.getContext('2d'),
				html = [],
				points = [
				    {
						targetX: 0, 
						targetY: 300, 
						labelX: 25, 
						labelY: 240,
						width: 75,
						lineConnectX: 50, 
						lineConnectY: 266,
						target: "/json/dus/",
						copy: "Wake up",
						time: "5:30"
				    },
				    {
						targetX: 123, 
						targetY: 300,
						labelX: 113, 
						labelY: 200,
						width: 105,
						lineConnectX: 153, 
						lineConnectY: 226, 
						target: "/json/usps/", 
						copy: "Vespa to work",
						time: "6:40"
				    },
				    {
						targetX: 246, 
						targetY: 300, 
						labelX: 232, 
						labelY: 160,
						width: 150,
						lineConnectX: 300, 
						lineConnectY: 186,
						target: "/json/uspn/", 
						copy: "Think hard about stuff",
						time: "7:00"
				    },
				    {
						targetX: 492, 
						targetY: 300, 
						labelX: 412, 
						labelY: 160,
						width: 130,
						lineConnectX: 442, 
						lineConnectY: 186, 
						target: "/json/th/", 
						copy: "Vespa back home",
						time: "4:30"
						
				    },
				    {
						targetX: 615, 
						targetY: 300, 
						labelX: 495, 
						labelY: 200,
						width: 150,
						lineConnectX: 585, 
						lineConnectY: 226, 
						target: "/json/usps/", 
						copy: "Think hard about Stuff",
						time: "5:00"
				    },
				    {
						targetX: 736, 
						targetY: 300, 
						labelX: 657, 
						labelY: 240,
						width: 55,
						lineConnectX: 690, 
						lineConnectY: 266, 
						target: "/json/th/", 
						copy: "Sleep",
						time: "9:00"
				    }
				];
			
			_line(ctx, 'rgba(255,255,255,0.66)', 0, 300, 736, 300);
			
			for(var i=0; i<points.length; i++){
			    html.push(_pointMaker(ctx, points[i]));
			}
								
			// add buttons
			$container.append(html.join(''));
			
			$('.map-feature-link').zoombox({
				targetWidth: 870, 
				targetHeight: 361, 
				targetPosX: 56, 
				targetPosY: 95, 
				containerParent: '.neighborhood-map .active-content', 
				zoomboxEasing: 'easeOutExpo',
				zoomboxAnimationSpeed: '750',
				growFromTagAttr: true,
				growTagAttr: 'rel',
				openCallback: function(e){
					var $wrap = $('<div id="zc-wrap" style="display:none;"/>');
					$wrap.append('<div id="left"/>', '<div id="right"/>').appendTo('#zoombox-container');
					$('#zoombox-container').append('<div id="zb-loader"/>');
					
					$.getJSON($(e.currentTarget).attr('href'), function(data){
						var dImg = document.createElement('img');
						dImg.src = data.img;
						dImg.alt = data.heading;
						$(dImg).appendTo('#left');
						
						$('#left img').load(function(){
						    if(imgHasLoaded !== true){
						        imgHasLoaded = true;
						        $(this).addClass('shadow');
						        $('#right').append('<h2>'+data.heading+'</h2>'+data.copy);
						        $('#zb-loader').remove();
  									$('#zc-wrap').fadeIn(function(){ imgHasLoaded = false; });
						    }
						}).each(function(index) { // check complete in case background images load from cache
                                  if(this.complete) $(this).trigger('load');
                              });
					});
				},
				preClose: function(){ $('#zc-wrap').hide(); },
				closeCallback: function(){
				    $('#zc-wrap').remove();
				    imgHasLoaded = false;
				}
			});
			
			function _label(ctx, x, y, width, height, radius) {
				ctx.fillStyle = 'rgba(34,34,34,0.75)';
				ctx.strokeStyle = "rgba(255,255,255,0.25)";
				ctx.lineWidth = 3;
				
				ctx.beginPath();
				ctx.moveTo(x + radius, y);
				ctx.lineTo(x + width - radius, y);
				ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
				ctx.lineTo(x + width, y + height - radius);
				ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
				ctx.lineTo(x + radius, y + height);
				ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
				ctx.lineTo(x, y + radius);
				ctx.quadraticCurveTo(x, y, x + radius, y);
				ctx.closePath();
				ctx.stroke();
				ctx.fill();
			}
			
			function _target(ctx, x, y) {
				ctx.fillStyle = 'rgb(246,135,41)';
				ctx.strokeStyle = "rgba(255,255,255,0.66)";
				ctx.lineWidth = 3;
				
				ctx.beginPath();
				ctx.arc(x, y, 5, 0, Math.PI*2, false);
				ctx.closePath();
				ctx.stroke();
				ctx.fill();
			}
			
			function _line(ctx, color, x1, y1, x2, y2) {
				ctx.strokeStyle = color;
				ctx.lineWidth = 1;
				
				ctx.beginPath();
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
				ctx.closePath();
				ctx.stroke();
			}
			
			function _pointMaker(ctx, o){
			    _label(ctx, o.labelX, o.labelY, o.width, 25, 3);
			    _line(ctx, 'rgba(55,100,111,0.66)', o.lineConnectX, o.lineConnectY, o.targetX, o.targetY);
				_target(ctx, o.targetX, o.targetY);
				return '<a class="map-feature-link" style="top: '+o.labelY+'px; left: '+o.labelX+'px; width: '+o.width+'px; height: 25px;" href="'+o.target+'" rel="'+o.targetX+', '+o.targetY+'">'+o.copy+'</a>';
			}
		}
		
		
		return pub;
	})();
	
	self.Construct = (function(){
		$(document).ready(function(){ Zb.Ex.init(); });
	})();
	
}).call(Zb, jQuery);

// $(document).ready(function(){
// 	
// 	$('#pony').zoombox({
// 		targetWidth: 600,
// 	    targetHeight: 540,
// 	    targetPosX: 68,
// 	    targetPosY: ($(window).height()-540)/2,
// 		containerParent: '#jie-main',
// 	    preOpen: function(e){
// 			var frag = '<div style="display:none;" id="pony-wrapper">\
// 							<h4>This here is a cool pony</h4>\
// 							<img src="imgs/cool-pony.jpg" alt="cool pony" />\
// 						</div>';
// 			
// 			$( $(e.currentTarget).data('zbxTarget') ).append(frag);
// 	    },
// 	    onOpened: function(e){
// 	      $($(e.currentTarget).data('zbxTarget')).find('#pony-wrapper').fadeIn();
// 	    },
// 	    preClose: function(e){
// 	      $($(e.currentTarget).data('zbxTarget')).find('#pony-wrapper').remove();
// 	    }
// 	});
// 	
// });