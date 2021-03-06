require.config({
    shim: {
        jquery: {
            init: function() {
                return $;
            }
        },
        bootstrap: ['jquery'],
        jquery_ui: ['jquery'],
        colorpicker: ['jquery'],
        underscore : {
            exports : '_'
        },
        kinetic: {
            init: function() {
                return Kinetic;
            }
        }
    },
    paths: {
        jquery: 'lib/jquery-1.11.0.min',
        underscore: 'lib/underscore.min',
        bootstrap: 'lib/bootstrap.min',
        settings: 'lib/settings',
        jquery_ui: 'jquery-ui-1.10.4.min',
        text: 'lib/require-text',
        kinetic: 'lib/kinetic-v5.1.0.min',
        colorpicker: 'lib/colorpicker/colorpicker'
    }
});


var deps = [
    'jquery', 'beetledig/ui/OrthologViewer'
];

require(deps, function($, OrthologViewer){
     ortholinks = { 'OrthoDB':'http://cegg.unige.ch/orthodb7/results',
                    'FlyBase':'http://flybase.org/cgi-bin/uniq.html?species=Dmel&db=fbgn&caller=quicksearch'
                  };
     otherLinks = {
                   'ibeetle':'http://ibeetle-base.uni-goettingen.de/details/'
                  };
     OrthologViewer.create('#ortholog-container',ortholinks);
     OrthologViewer.other('#other-container',otherLinks);
});
