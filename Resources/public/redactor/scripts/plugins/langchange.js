if (typeof RedactorPlugins === 'undefined') var RedactorPlugins = {};

var pText  = '';

var pLang  = 'en';

var tag    = false;

RedactorPlugins.langchange = {
	
	init: function()
	{
		$('body').append('<div id="langchange_plugin" style="display: none;">');
		
		var callback = $.proxy(function()
		{
			$('#redactor_modal #langchange_lang').val(pLang);
			
			$('#redactor_modal .redactor_btn_modal_insert').each($.proxy(function(i,s)
			{
				$(s).click($.proxy(function()
				{
					this.insertLang($('#redactor_modal #langchange_lang').val());
					return false;
					
				}, this));
					
			}, this));
			
			$('#redactor_modal .redactor_btn_modal_remove').each($.proxy(function(i,s)
			{
				$(s).click($.proxy(function()
				{
					this.removeLang();
					return false;
					
				}, this));
				
			}, this));
			
			
			this.saveSelection();
			this.setBuffer();
			
		}, this);
	
        this.addBtnAfter('link', 'langchange', 'Sprachauszeichnung', function(obj)
		{
        	var sel = $(obj.getSelectedHtmlObj());
        	
        	if ($.browser.msie) {
            	tag = sel.find('SPAN');
        	}
        	else {
            	tag = sel.find('span');
        	}
        	
        	if (tag.length) {
        		pLang  = tag.attr('lang');
        		pText  = tag.text(); 
        	}
        	else {
        		pText  = sel.text();
        	}
        	
        	$('#acronym_plugin').load(RedactorBaseUrl + '/plugins/langchange.html', function(a,b,c) {
                obj.modalInit('Sprachauszeichnung', '#langchange', 400, callback);
            });
		});		

	},
	
	insertLang: function(lang)
	{
		this.restoreSelection();
		
    	var html = $('<span lang="' + lang + '"></span>');
    	
    	if (pText) {
    		html.text($.trim(pText));
    		this.execCommand('inserthtml', $('<div></div>').html(html).html());
    	}
    	
		this.modalClose();
	},

    removeLang: function()
    {
		this.restoreSelection();
		
		if (pText) {
			this.execCommand('inserthtml', pText);
		}
		
		this.modalClose();
    }
};