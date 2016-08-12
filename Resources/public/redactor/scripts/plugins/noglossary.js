if (typeof RedactorPlugins === 'undefined') var RedactorPlugins = {};

RedactorPlugins.noglossary = {

	init: function()
	{
	    var self = this;
	    
		this.addBtnAfter('formatting', 'noglossary', 'Noglossary', function(obj) {
		    self.toggleNoglossary.call(obj);
		});
    },

    toggleNoglossary: function()
	{
		var txt     = '',
		tag     = false,
		sel 	= $(this.getSelectedHtmlObj()),
		current = $(this.getCurrentNode());
	
		if ($.browser.msie) {
	    	tag = sel.find('DFN');
		}
		else {
	    	tag = sel.find('dfn');
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
	        
	        txt = ['<dfn>', txt, '</dfn>'].join("");
	    }
	    else {
	        if ($.browser.msie) {
	            current.remove();
	    	}
	    }
    
	    this.execCommand('inserthtml', txt);
	}
}