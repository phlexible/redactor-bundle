if (typeof RedactorPlugins === 'undefined') var RedactorPlugins = {};

RedactorPlugins.fixitalic = {

	init: function()
	{
	    var self = this;
	    
		this.addBtnBefore('unorderedlist', 'fixitalic', 'Fixitalic', function(obj) {
		    self.toggleItalic.call(obj);
		});
	},
	
	toggleItalic: function() 
	{
		var txt     = '',
			tag     = false,
			sel 	= $(this.getSelectedHtmlObj()),
			current = $(this.getCurrentNode());
    	
    	if ($.browser.msie) {
        	tag = sel.find('EM');
    	}
    	else {
        	tag = sel.find('em');
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
            
            txt = ['<em>', txt, '</em>'].join(""); 
        }
        else {
            if ($.browser.msie) {
                current.remove();
        	}
        }
        
        this.execCommand('inserthtml', txt);
	}
}