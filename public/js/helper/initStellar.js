$(function(){
		  $.stellar({
			horizontalScrolling: false,
			verticalOffset:350,
		   hideElement: function($elem) { $elem.fadeOut(); },
		   showElement: function($elem) { $elem.fadeIn(); },
			
		  });
		  
		  
		});