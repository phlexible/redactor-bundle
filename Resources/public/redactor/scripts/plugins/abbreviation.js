if (typeof RedactorPlugins === 'undefined') var RedactorPlugins = {};

var pText  = '';
var pTitle = '';
var pLang  = '';

var tag    = false;

RedactorPlugins.abbreviation = {

	init: function()
	{
		$('body').append('<div id="abbreviation_plugin" style="display: none;">');
		
		var callback = $.proxy(function()
		{
			$('#redactor_modal #abbreviation_title').val(pTitle);
			$('#redactor_modal #abbreviation_lang').val(pLang);
			
			$('#redactor_modal .redactor_btn_modal_insert').each($.proxy(function(i,s)
			{
				$(s).click($.proxy(function()
				{
					this.insertAbbr($('#redactor_modal #abbreviation_title').val(), $('#redactor_modal #abbreviation_lang').val());
					return false;
					
				}, this));
					
			}, this));
			
			$('#redactor_modal .redactor_btn_modal_remove').each($.proxy(function(i,s)
			{
				$(s).click($.proxy(function()
				{
					this.removeAbbr();
					return false;
					
				}, this));
				
			}, this));
			
			
			this.saveSelection();
			this.setBuffer();
			
		}, this);
	
        this.addBtnAfter('formatting', 'abbreviation', 'Abbreviation', function(obj)
		{
        	var sel = $(obj.getSelectedHtmlObj());
        	
        	if ($.browser.msie) {
            	tag = sel.find('ABBR');
        	}
        	else {
            	tag = sel.find('abbr');
        	}
        	
        	if (tag.length) {
        		pTitle = tag.attr('title');
        		pLang  = tag.attr('lang');
        		pText  = tag.text(); 
        	}
        	else {
            	pTitle = '';
            	pLang  = '';
        		pText  = sel.text();
        	}
        	
        	$('#abbreviation_plugin').load(RedactorBaseUrl + '/plugins/abbreviation.html', function() {
                obj.modalInit('Abbreviation', '#abbreviation', 400, callback);
            });
		});		
		
        this.addBtnSeparatorBefore('abbreviation');

	},
	
	insertAbbr: function(title, lang)
	{
		this.restoreSelection();
		
		if (lang) {
	    	var html = $('<abbr title="' + title + '" lang="' + lang + '"></abbr>');
		}
		else {
	    	var html = $('<abbr title="' + title + '"></abbr>');
		}
    	
    	if (pText) {
    		html.text($.trim(pText));
    		this.execCommand('inserthtml', $('<div></div>').html(html).html());
    	}
    	
		this.modalClose();
	},

    removeAbbr: function()
    {
		this.restoreSelection();
		
		if (pText) {
			this.execCommand('inserthtml', pText);
		}
		
		this.modalClose();
    }
};