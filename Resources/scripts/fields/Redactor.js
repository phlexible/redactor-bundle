// (function() {
    Ext.namespace("Ext.ux");

    Ext.ux.Redactor = Ext.extend(
        // Constructor
        function (cfg) {

            var config = {
                redactorSettings: {
                    focus: false
                }
            };

            Ext.apply(config, cfg);

            // Add events
            this.addEvents({
                "editorcreated": true
            });

            Ext.ux.Redactor.superclass.constructor.call(this, config);
        },

        // Base class
        Ext.form.Field,
        // Members
        {
            // Redactor Settings specified for this instance of the editor.
            redactorSettings: null,

            // HTML markup for this field
            defaultAutoCreate: {tag: "div", style: {overflow: "hidden"}, children: [{tag: "textarea"}]},

            // Default width
            width: 200,

            // Default height
            height: 200,

            initComponent: function () {

                var redactorSettings = {
                    "lang": "de",
                    "buttons": [
                        "html",
                        "|",
                        "formatting",
                        "|",
                        "unorderedlist",
                        "orderedlist",
                        "horizontalrule",
                        "|",
                        "link"
                    ],
                    "activeButtons": [
                        "deleted",
                        "italic",
                        "underline",
                        "unorderedlist",
                        "orderedlist",
                        "abbreviation",
                        "acronym",
                        "noglossary",
                        "fixbold",
                        "fixitalic",
                        "link"
                    ],
                    "activeButtonsStates": {
                        "a": "link",
                        "b": "fixbold",
                        "strong": "fixbold",
                        "i": "fixitalic",
                        "em": "fixitalic",
                        "abbr": "abbreviation",
                        "acronym": "acronym",
                        "span": "lang",
                        "noglossary": "noglossary"
                    },
                    "plugins": [
                        "acronym",
                        "abbreviation",
                        "langchange",
                        "noglossary",
                        "fullscreen",
                        "fixbold",
                        "fixitalic"
                    ],
                    "allowedTags": [
                        "code",
                        "span",
                        "div",
                        "label",
                        "a",
                        "br",
                        "p",
                        "b",
                        "i",
                        "del",
                        "strike",
                        "u",
                        "img",
                        "video",
                        "audio",
                        "iframe",
                        "object",
                        "embed",
                        "param",
                        "blockquote",
                        "mark",
                        "cite",
                        "small",
                        "ul",
                        "ol",
                        "li",
                        "hr",
                        "dl",
                        "dt",
                        "dd",
                        "sup",
                        "sub",
                        "big",
                        "pre",
                        "code",
                        "figure",
                        "figcaption",
                        "strong",
                        "em",
                        "table",
                        "tr",
                        "td",
                        "th",
                        "tbody",
                        "thead",
                        "tfoot",
                        "h1",
                        "h2",
                        "h3",
                        "h4",
                        "h5",
                        "h6",
                        "acronym",
                        "abbr",
                        "dfn"
                    ]
                };

                this.redactorSettings = redactorSettings || {};
            },

            onRender: function (ct, position) {

                Ext.ux.Redactor.superclass.onRender.call(this, ct, position);

                var self = this;

                // Fix size if it was specified in config
                var el = this.getEl();
                if (Ext.type(this.width) == "number") {
                    el.setWidth(this.width);
                    this.redactorSettings.width = this.width;
                }
                if (Ext.type(this.height) == "number") {
                    el.setHeight(this.height);
                    this.redactorSettings.height = this.height - 60;
                }

                // Fetch reference to <textarea> element
                var textarea = el.child("textarea");
                this.textareaEl = textarea;
                if (this.name) textarea.set({name: this.name});
                var id = textarea.id;

                this.createEditor(id);

                // Indicate that editor is created
                this.fireEvent("editorcreated");
            },

            createEditor: function (id) {

                // set height for scrollbars
                $('#' + id).css("height", this.redactorSettings.height + "px");

                // create editor
                this.ed = $('#' + id).redactor({
                    focus: false,
                    autoresize: false,
                    lang: this.redactorSettings.lang,
                    buttons: this.redactorSettings.buttons,
                    activeButtons: this.redactorSettings.activeButtons,
                    activeButtonsStates: this.redactorSettings.activeButtonsStates,
                    plugins: this.redactorSettings.plugins,
                    allowedTags: this.redactorSettings.allowedTags
                });

                // set value to editor
                var pattern = /<([\/]*)([a-zA-Z_0-9]+)([^>]*)>/g;
                this.value = this.value.replace(pattern, function (full, before, tag, after) {
                    return "<" + before + tag.toUpperCase() + after + ">"
                });

                this.ed.setCode(this.value);
            },

            initValue: function () {

                if (this.value !== undefined) {
                    this.setValue(this.value);
                }
                else {
                    var textarea = this.getEl().child("textarea", true);
                    if (textarea.value.length > 0)
                        this.setValue(textarea.value);
                }
            },

            getValue: function () {

                if (!this.rendered || !this.ed.initialized)
                    return this.value;

                var v = this.ed.getContent();
                if (v === this.emptyText || v === undefined) {
                    v = '';
                }
                return v;
            },

            setValue: function (v) {

                this.value = v;
            }
        }
    );

    Ext.apply(Ext.ux.Redactor, {});

    Ext.ComponentMgr.registerType("redactor", Ext.ux.Redactor);

    Ext.provide('Phlexible.redactor.field.Redactor');

    Phlexible.redactor.field.Redactor = Ext.extend(Ext.ux.Redactor, {
        hideMode: 'offsets',

        removeControl: function () {
            return;
        },

        restoreControl: function () {
            return;
        },

        disableAfterRender: function (field) {
            return;
        },

        onRender: function (ct, position) {

            Phlexible.redactor.field.Redactor.superclass.onRender.call(this, ct, position);

            Phlexible.fields.FieldHelper.prefix.call(this);
            Phlexible.fields.FieldHelper.suffix.call(this);

            // TODO: synchronized is no more available?!
            // Phlexible.fields.FieldHelper['synchronized'].call(this);
            //

        }
    });

    Ext.reg('redactor', Phlexible.redactor.field.Redactor);
// });
