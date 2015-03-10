var deps = [
    'jquery', 'underscore', 'lib/util',
    'jquery_ui'
];

define(deps, function($, _, util) {

    //var RectanglesUIHelper = {

    //}

    function RectanglesUI(selector) {
         this.$list = $(selector);
         this.$list.append('<li><a href="http://mbilwebh02.mbi.miamioh.edu/images/viewer/12" class="Larva"></a></li>');
         this.$list.append('<li><a href="http://mbilwebh02.mbi.miamioh.edu/images/viewer/13" class="Embryo"></a></li>');
         this.$list.append('<li><a href="http://mbilwebh02.mbi.miamioh.edu/images/viewer/14" class="head"></a></li>');
         this.$list.append('<li><a href="http://mbilwebh02.mbi.miamioh.edu/images/viewer/20" class="thorax"></a></li>');
         this.$list.append('<li><a href="http://mbilwebh02.mbi.miamioh.edu/images/viewer/15" class="abdomen"></a></li>');
         this.$list.append('<li><a href="http://mbilwebh02.mbi.miamioh.edu/images/viewer/11" class="Pupa"></a></li>');
         this.$list.append('<li><a href="http://mbilwebh02.mbi.miamioh.edu/images/viewer/17" class="otherphenotype"></a></li>');
        }
    // returns a factory for the Zoomable UI
    return {
        create: function(selector) {

            var ui = new RectanglesUI(selector);

            return ui;
        }
    };

});
