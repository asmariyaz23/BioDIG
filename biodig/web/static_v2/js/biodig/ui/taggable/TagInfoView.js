var deps = [
    'jquery', 'underscore', 'text!biodig/tmpl/taggable/tag-info.html'
];

define(deps, function($, _, TagInfoTmpl) {

    var TagInfoTemplate = _.template(TagInfoTmpl);

    function TagInfoView(selector) {
        this.$container = $(selector);
    }

    TagInfoView.prototype.add = function(tag) {
        var $info = $(TagInfoTemplate(tag));
        this.$container.append($info);
    };

    TagInfoView.prototype.clear = function() {
        this.$container.empty();
    };

    return {
        create : function(selector) {
            return new TagInfoView(selector);
        }
    }
});