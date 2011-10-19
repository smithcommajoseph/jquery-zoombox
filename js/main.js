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
						target: "up.js",
						copy: "Wake up"
				    },
				    {
						targetX: 123, 
						targetY: 300,
						labelX: 113, 
						labelY: 200,
						width: 105,
						lineConnectX: 153, 
						lineConnectY: 226, 
						target: "work.js", 
						copy: "Vespa to work"
				    },
				    {
						targetX: 246, 
						targetY: 300, 
						labelX: 232, 
						labelY: 160,
						width: 150,
						lineConnectX: 300, 
						lineConnectY: 186,
						target: "think1.js", 
						copy: "Think hard about stuff"
				    },
				    {
						targetX: 492, 
						targetY: 300, 
						labelX: 412, 
						labelY: 160,
						width: 130,
						lineConnectX: 442, 
						lineConnectY: 186, 
						target: "home.js", 
						copy: "Vespa back home"
				    },
				    {
						targetX: 615, 
						targetY: 300, 
						labelX: 495, 
						labelY: 200,
						width: 150,
						lineConnectX: 585, 
						lineConnectY: 226, 
						target: "think2.js", 
						copy: "Think hard about Stuff"
				    },
				    {
						targetX: 736, 
						targetY: 300, 
						labelX: 657, 
						labelY: 240,
						width: 55,
						lineConnectX: 690, 
						lineConnectY: 266, 
						target: "down.js", 
						copy: "Sleep"
				    }
				];
			
			_line(ctx, 'rgba(255,255,255,0.66)', 0, 300, 736, 300);
			
			for(var i=0; i<points.length; i++){
			    html.push(_pointMaker(ctx, points[i]));
			}
								
			// add buttons
			$container.append(html.join(''));
			
			$('.map-feature-link').zoombox({
				targetWidth: 716, 
				targetHeight: 330, 
				targetPosX: 10, 
				targetPosY: 10, 
				containerParent: '#map-container', 
				zoomboxAnimationSpeed: '750',
				growFromTagAttr: true,
				growTagAttr: 'rel',
				onOpened: function(e){
					var $wrap = $('<div id="zc-wrap" style="display:none;"/>');
					$wrap.appendTo($(e.currentTarget).data('zbxTarget'));
					
					$.getJSON($(e.currentTarget).attr('href'), function(data){
						$('#zc-wrap', $(e.currentTarget).data('zbxTarget'))
							.append('<h4>'+data.title+'</h4><p>'+data.copy+'</p>')
							.fadeIn();
					});
				},
				preClose: function(e){ $('#zc-wrap').hide(); },
				onClosed: function(e){
				    $('#zc-wrap', $(e.currentTarget).data('zbxTarget')).remove();
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
				return '<a class="map-feature-link" style="top: '+o.labelY+'px; left: '+o.labelX+'px; width: '+o.width+'px; height: 25px;" href="js/'+o.target+'" rel="'+o.targetX+', '+o.targetY+'">'+o.copy+'</a>';
			}
		}
		
		return pub;
	})();
	
	self.Construct = (function(){
		$(document).ready(function(){ Zb.Ex.init(); });
	})();
	
}).call(Zb, jQuery);