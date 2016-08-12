if (typeof RedactorPlugins === 'undefined') var RedactorPlugins = {};

var pText  = '';
var pTitle = '';
var pLang  = '';

var tag    = false;

RedactorPlugins.acronym = {
	
	init: function()
	{
		$('body').append('<div id="acronym_plugin" style="display: none;">');
		
		var callback = $.proxy(function()
		{
			$('#redactor_modal #acronym_title').val(pTitle);
			$('#redactor_modal #acronym_lang').val(pLang);
			
			$('#redactor_modal .redactor_btn_modal_insert').each($.proxy(function(i,s)
			{
				$(s).click($.proxy(function()
				{
					this.insertAcronym($('#redactor_modal #acronym_title').val(), $('#redactor_modal #acronym_lang').val());
					return false;
					
				}, this));
					
			}, this));
			
			$('#redactor_modal .redactor_btn_modal_remove').each($.proxy(function(i,s)
			{
				$(s).click($.proxy(function()
				{
					this.removeAcronym();
					return false;
					
				}, this));
				
			}, this));
			
			
			this.saveSelection();
			this.setBuffer();
			
		}, this);
	
        this.addBtnAfter('formatting', 'acronym', 'Acronym', function(obj)
		{
			//this.$editor.html(this.formattingEmptyTags(this.$editor.html()));
        	
        	var sel = $(obj.getSelectedHtmlObj());
        	
        	if ($.browser.msie) {
            	tag = sel.find('ACRONYM');
        	}
        	else {
            	tag = sel.find('acronym');
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
        	
        	$('#acronym_plugin').load(RedactorBaseUrl + '/plugins/acronym.html', function() {
                obj.modalInit('Acronym', '#acronym', 400, callback);
            });
		});		
	},
	
	insertAcronym: function(title, lang)
	{
		this.restoreSelection();
		
		if (lang) {
	    	var html = $('<acronym title="' + title + '" lang="' + lang + '"></acronym>');
		}
		else {
	    	var html = $('<acronym title="' + title + '"></acronym>');
		}
    	
    	if (pText) {
    		html.text($.trim(pText));
    		this.execCommand('inserthtml', $('<div></div>').html(html).html());
    	}
    	
		this.modalClose();
	},

	removeAcronym: function()
	{
		this.restoreSelection();
		
		if (pText) {
			this.execCommand('inserthtml', pText);
		}
		
		this.modalClose();
	}
};