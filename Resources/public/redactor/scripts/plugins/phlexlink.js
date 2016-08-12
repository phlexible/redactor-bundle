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