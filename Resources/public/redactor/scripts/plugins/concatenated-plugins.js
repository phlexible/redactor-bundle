/*
Concatenated redactor plugins
plugins/abbreviation.js 
plugins/acronym.js 
plugins/fixbold.js 
plugins/fixitalic.js 
plugins/fullscreen.js 
plugins/langchange.js 
plugins/noglossary.js 
plugins/phlexlink.js
*/
if (typeof RedactorBaseUrl === 'undefined') var RedactorBaseUrl = '';
/* Resource: plugins/abbreviation.js */
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
/* Resource: plugins/acronym.js */
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
/* Resource: plugins/fixbold.js */
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
/* Resource: plugins/fixitalic.js */
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
/* Resource: plugins/fullscreen.js */
if (typeof RedactorPlugins === 'undefined') var RedactorPlugins = {};

RedactorPlugins.fullscreen = {

	init: function()
	{	
		this.fullscreen = false;
		this.addBtn('fullscreen', 'Fullscreen', function(obj)
		{
			obj.toggleFullscreen();
		});
		
		this.setBtnRight('fullscreen');
	},
	
	toggleFullscreen: function()
	{
		var html;
	
		if (this.fullscreen === false)
		{
			this.changeBtnIcon('fullscreen', 'normalscreen');
			this.setBtnActive('fullscreen');
			this.fullscreen = true;
			
			this.fsheight = this.$editor.height();

			this.tmpspan = $('<span></span>');
			this.$box.addClass('redactor_box_fullscreen').after(this.tmpspan);

			$('body, html').css('overflow', 'hidden');
			$('body').prepend(this.$box);

			this.fullScreenResize();
			$(window).resize($.proxy(this.fullScreenResize, this));
			$(document).scrollTop(0,0);
			
			this.$editor.focus();
		}
		else
		{
			this.removeBtnIcon('fullscreen', 'normalscreen');
			this.setBtnInactive('fullscreen');
			this.fullscreen = false;

			$(window).unbind('resize', $.proxy(this.fullScreenResize, this));
			$('body, html').css('overflow', '');
			
			this.$box.removeClass('redactor_box_fullscreen').css({ width: 'auto', height: 'auto' });
			this.tmpspan.after(this.$box).remove();
			
			this.syncCode();
			
			
			if (this.opts.autoresize)
			{
				this.$el.css('height', 'auto');
				this.$editor.css('height', 'auto');						
			}
			else
			{
				this.$el.css('height', this.fsheight);
				this.$editor.css('height', this.fsheight);			
			}
			
			this.$editor.focus();
		}		
	},
	
	fullScreenResize: function()
	{
		if (this.fullscreen === false)
		{
			return false;
		}
		
		var pad = this.$editor.css('padding-top').replace('px', '');
		var height = $(window).height() - 34;
		
		this.$box.width($(window).width() - 2).height(height+34);		
		this.$editor.height(height-(pad*2));
		this.$el.height(height);
		
		return true;
	}
};
/* Resource: plugins/langchange.js */
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
/* Resource: plugins/noglossary.js */
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
/* Resource: plugins/phlexlink.js */
if (typeof RedactorPlugins === 'undefined') var RedactorPlugins = {};

RedactorPlugins.phlexlink = {

	init: function()
	{
		$('body').append('<div id="phlexlink_plugin">');
		
		var callback = $.proxy(function()
		{			
			this.insert_link_node = false;
			
			var sel = this.getSelection();
			var url = '', text = '', target = '';
			
			if ($.browser.msie)
			{
				var parent = this.getParentNode();
				if (parent.nodeName === 'A')
				{
					this.insert_link_node = $(parent);
					text = this.insert_link_node.text();
					url = this.insert_link_node.attr('href');
					target = this.insert_link_node.attr('target');
				}
				else
				{
					if (this.oldIE())
					{
						text = sel.text;
					}
					else
					{
						text = sel.toString();
					}
				}
			}
			else
			{					
				if (sel && sel.anchorNode && sel.anchorNode.parentNode.tagName === 'A')
				{
					url = sel.anchorNode.parentNode.href;
					text = sel.anchorNode.parentNode.text;
					target = sel.anchorNode.parentNode.target;
					
					if (sel.toString() === '')
					{
						this.insert_link_node = sel.anchorNode.parentNode;
					}
				}
				else
				{
					text = sel.toString();
				}
			}
			
			$('.redactor_phlexlink_text').val(text);
			
			var thref = self.location.href.replace(/\/$/i, '');
			var turl = url.replace(thref, '');
			
			$('#redactor_modal #redactor_phlexlink_url').val(turl);
			$('#redactor_modal #redactor_insert_phlexlink_btn').click($.proxy(this.insertPhlexlink, this));
			$('#redactor_modal #redactor_phlexlink_url').focus();

		}, this);
	
        this.addBtnAfter('link', 'phlexlink', 'Phlexible link', function(obj)
		{
            $('#phlexlink_plugin').load(RedactorBaseUrl + '/plugins/phlexlink.html', function(r) {
                
    			obj.saveSelection();
                obj.modalInit('Phlexible link', '#phlexlink', 460, callback);
            });
		});		

	},
	
	insertPhlexlink: function()
	{
		var link = '', text = '', target = '';
		
		link = $('#redactor_modal #redactor_phlexlink_url').val();
		text = $('#redactor_modal #redactor_phlexlink_url_text').val();

		// test url
		var pattern = '((xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}';				
		var re = new RegExp('^(http|ftp|https)://' + pattern,'i');
		var re2 = new RegExp('^' + pattern,'i');
		if (link.search(re) == -1 && link.search(re2) === 0 && this.opts.protocol !== false)
		{
			link = this.opts.protocol + link;
		}

		this._insertPhlexlink('<a href="' + link + '"' + target + '>' +  text + '</a>', $.trim(text), link, target);
	},
	
	_insertPhlexlink: function(a, text, link, target)
	{
		this.$editor.focus();
		this.restoreSelection();	
	
		if (text !== '')
		{
			if (this.insert_link_node)
			{				
				$(this.insert_link_node).text(text);
				$(this.insert_link_node).attr('href', link);
				if (target !== '')
				{
					$(this.insert_link_node).attr('target', target);
				}
				else
				{
					$(this.insert_link_node).removeAttr('target');
				}
				
				this.syncCode();
			}
			else
			{
				this.execCommand('inserthtml', a);
			}
		}
		
		this.modalClose();
	}
};


//var templates = {
//	"window.open" : "window.open('${url}','${target}','${options}')"
//};
//
//function showPhlexibleLinkWindow() {
//    var w = new parent.Makeweb.tinymce.LinkWindow({
//        submitParams: {
//            siteroot_id: '48ef589f-2ddc-4cb6-9a54-7e0dc0a8005b'
//        },
//        listeners: {
//            submit: function(values){
//                console.log(values);
//                toPhlexibleLink(values.tid);
//            }
//        }
//    });
//    w.show();
//}
//
//function toPhlexibleLink(tid) {
//    document.getElementById('href').value = '[tid=' + tid + ']';
//}