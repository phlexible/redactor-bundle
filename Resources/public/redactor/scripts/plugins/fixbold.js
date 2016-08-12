if (typeof RedactorPlugins === 'undefined') var RedactorPlugins = {};

RedactorPlugins.fixbold = {

	init: function()
	{
	    var self = this;
	    
		this.addBtnBefore('unorderedlist', 'fixbold', 'Fixbold', function(obj) {
		    self.toggleBold.call(obj);
		});
	},
	
	toggleBold: function() 
	{
		var txt     = '',
		tag     = false,
		sel 	= $(this.getSelectedHtmlObj()),
		current = $(this.getCurrentNode());
	
		if ($.browser.msie) {
	    	tag = sel.find('STRONG');
		}
		else {
	    	tag = sel.find('strong');
		}
		
		if (tag.length) {
			txt  = tag.text(); 
		}
		else {
			txt  = sel.text();
		}
	
	    if (!tag.length) {
	        if (txt === "") {
	            return;
	        }
	        
	        txt = ['<strong>', txt, '</strong>'].join(""); 
	    }
	    else {
	        if ($.browser.msie) {
	            current.remove();
	    	}
	    }
    
	    this.execCommand('inserthtml', txt);
	}
}