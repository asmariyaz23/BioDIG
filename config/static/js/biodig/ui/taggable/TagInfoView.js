var deps = [
    'jquery', 'underscore', 'settings', 'text!biodig/tmpl/taggable/tag-info.html'
];

define(deps, function($, _, settings, TagInfoTmpl) {

    var TagInfoTemplate = _.template(TagInfoTmpl);

    function TagInfoView(selector) {
        this.$container = $(selector);
    }

    TagInfoView.prototype.update = function(tags) {
        var self = this;
        this.clear();

        $.each(tags, function(id, tag) {
            tag.settings = settings;
            var $info = $(TagInfoTemplate(tag));
            self.$container.append($info);
        });
    };

    TagInfoView.prototype.clear = function() {
        this.$container.empty();
    };
    
//    TagInfoView.prototype.gbrowse = function(eventName,tc){
//             var method = "POST";
//             var path = "http://beetlebase.org/cgi-bin/gbrowse/BeetleBase3.gff3/";
//             var params = {"#search":tc};
//             var form = document.createElement("form");
//             form.setAttribute("method", method);
//             form.setAttribute("action", path);

//             for (var key in params) {
//                if(params.hasOwnProperty(key)) {
//                    var hiddenField = document.createElement("input");
//                    hiddenField.setAttribute("type", "hidden");
//                    hiddenField.setAttribute("name", key);
//                    hiddenField.setAttribute("value", params[key]);
//                    form.appendChild(hiddenField);
//                }
//             }

//          document.body.appendChild(form);
//          form.submit();
//    };
    
//    $('#gbrowse').gbrowse('onclick',tc);

    return {
        create : function(selector) {
            return new TagInfoView(selector);
        }
    }
});
