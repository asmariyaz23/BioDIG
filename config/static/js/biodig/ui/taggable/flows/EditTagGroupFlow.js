var deps = [
    'jquery', 'underscore', 'biodig/ui/dialogs/FlowNode',
    'text!biodig/tmpl/taggable/dialogs/choose-tag-group.html',
    'text!biodig/tmpl/taggable/dialogs/edit-tag-group.html'
];

define(deps, function($, _, FlowNode, ChooseTagGroupTmpl, EditTagGroupTmpl) {
    // When editing a tag group one must choose the tag group to edit first
    function EditTagGroupFlow() {
        var flow = [
            FlowNode.create(_.template(ChooseTagGroupTmpl), function(body) {
                // get the json stringified tag group stored in the data section
                // of the option and turn it back into an object for rendering
                return $.parseJSON(
                    unescape(body.find('.select-tag-group option:selected').data('tagGroup'))
                );
            }),
            FlowNode.create(_.template(EditTagGroupTmpl), function(body) {
                return {
                    "id" : body.find('input[name="id"]').val(),
                    "name" : body.find('input[name="name"]').val()
                };
            })
        ];

        // set the pointers according the array order for ease
        for (var i = 0; i < flow.length; i++) {
            if (i < flow.length - 1) flow[i].next(flow[i+1]);
            if (i > 0) flow[i].prev(flow[i-1]);
        }

        return flow[0];
    }

    return {
        get: function() {
            return EditTagGroupFlow();
        }
    }
});
