var deps = [
    'jquery', 'underscore', 'biodig/ui/dialogs/FlowNode',
    'biodig/ui/taggable/flows/ChooseFeatureFlowNode',
    'text!biodig/tmpl/taggable/dialogs/choose-tag-group.html',
    'text!biodig/tmpl/taggable/dialogs/choose-tag.html',
];

define(deps, function($, _, FlowNode, ChooseFeatureFlowNode, ChooseTagGroupTmpl, ChooseTagTmpl) {

    function AddGeneLinkFlow() {
        var flow = [
            FlowNode.create(_.template(ChooseTagGroupTmpl), function(body) {
                // get the json stringified tag group stored in the data section
                // of the option and turn it back into an object for rendering
                return {
                    'tags': $.parseJSON(
                        unescape(body.find('.select-tag-group option:selected').data('tagGroup'))
                    ).tags,
                    'features': this.data().features,
                    'organisms': this.data().organisms,
                    'types': this.data().types
                };
            }).before(function(data) {
                // if tags are already given then we will skip
                if (data.tags) {
                    return data;
                }

                // if there is only one tag group then we will skip
                var keys = Object.keys(data.tagGroups);
                if (keys.length == 1) {
                    return {
                        'tags': data.tagGroups[keys[0]].tags,
                        'features': data.features,
                        'organisms': data.organisms,
                        'types': data.types
                    };
                }

                return false;
            }),
            FlowNode.create(_.template(ChooseTagTmpl), function(body) {
                return {
                    'tag': $.parseJSON(unescape(body.find('.select-tag option:selected').data('tag'))),
                    'features': this.data().features,
                    'organisms': this.data().organisms,
                    'types': this.data().types
                };
            }).before(function(data) {
                var keys = Object.keys(data.tags);
                if (keys.length == 1) {
                    return {
                        'tag': data.tags[keys[0]],
                        'features': data.features,
                        'organisms': data.organisms,
                        'types': data.types
                    };
                }

                return false;
            }),
            ChooseFeatureFlowNode.create(function(body) {
                return {
                    'tag': this.data().tag,
                    'organism': $.parseJSON(
                        unescape(body.find('.select-organism option:selected').data('organism'))
                    ),
                    'feature': $.parseJSON(
                        unescape(body.find('.select-feature option:selected').data('feature'))
                    )
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
            return AddGeneLinkFlow();
        }
    }
});
