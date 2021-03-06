( function($) {
	// A global array used by the functions of the plug-in:
	var gVars = '';
	// Extending the jQuery core:
	$.fn.tzineClock = function(opts){
		// "this" contains the elements that were selected when calling the plugin: $('elements').tzineClock();
		// If the selector returned more than one element, use the first one:
		var container = this.eq(0);
		if(!container) {
			try {
				console.log("Invalid selector!");
			} catch(e){}
			return false;
		}
		if(!opts) opts = {}; 
		var defaults = {
			/* Additional options will be added in future versions of the plugin. */
		};
		/* Merging the provided options with the default ones (will be used in future versions of the plugin): */
		$.each(defaults,function(k,v){
			opts[k] = opts[k] || defaults[k];
		})
		// Calling the setUp function and passing the container,
		// will be available to the setUp function as "this":
		setUp.call(container);
		return this;
	}
	
	function setUp() {
		var tmp;
		// Creating a new element and setting the color as a class name:
		tmp = $('<div>').attr('class', 'green clock').html(
			'<div class="display"></div>'+
			'<div class="front left"></div>'+
			'<div class="rotate left"><div class="bg left"></div>'+
			'</div><div class="rotate right"><div class="bg right"></div></div>'
		);
		// Appending to the container:
		$(this).append(tmp);
		// Assigning some of the elements as variables for speed:
		tmp.rotateLeft = tmp.find('.rotate.left');
		tmp.rotateRight = tmp.find('.rotate.right');
		tmp.display = tmp.find('.display');
		// Adding the dial as a global variable. Will be available as gVars.colorName
		gVars = tmp;
		// Setting up a interval, executed every 1000 milliseconds:
		setInterval(function() {
			var currentTime = new Date();
			var s = currentTime.getSeconds();
			animation(s, 60);
		}, 1000);
	}
	
	function animation(current, total) {
		// Calculating the current angle:
		var angle = (360/total)*(current+1);
		var element;
		if(current == 0) {
			// Hiding the right half of the background:
			gVars.rotateRight.hide();
			// Resetting the rotation of the left part:
			rotateElement(gVars.rotateLeft,0);
		}
		
		if(angle <= 180) {
			// The left part is rotated, and the right is currently hidden:
			element = gVars.rotateLeft;
		} else {
			// The first part of the rotation has completed, so we start rotating the right part:
			gVars.rotateRight.show();
			gVars.rotateLeft.show();
			
			rotateElement(gVars.rotateLeft,180);
			
			element = gVars.rotateRight;
			angle = angle-180;
		}
		rotateElement(element,angle);
		// Setting the text inside of the display element, inserting a leading zero if needed:
		gVars.display.html(current<10?'0'+current:current);
	}
	
	function rotateElement(element,angle) {
		// Rotating the element, depending on the browser:
		var rotate = 'rotate('+angle+'deg)';
		
		if(element.css('MozTransform')!=undefined)
			element.css('MozTransform',rotate);
			
		else if(element.css('WebkitTransform')!=undefined)
			element.css('WebkitTransform',rotate);
	
		// A version for internet explorer using filters, works but is a bit buggy (no surprise here):
		else if(element.css("filter") != undefined) {
			var cos = Math.cos(Math.PI * 2 / 360 * angle);
			var sin = Math.sin(Math.PI * 2 / 360 * angle);
			element.css("filter","progid:DXImageTransform.Microsoft.Matrix(M11="+cos+",M12=-"+sin+",M21="+sin+",M22="+cos+",SizingMethod='auto expand',FilterType='nearest neighbor')");
			element.css("left",-Math.floor((element.width()-200)/2));
			element.css("top",-Math.floor((element.height()-200)/2));
		}
	}
})(jQuery)