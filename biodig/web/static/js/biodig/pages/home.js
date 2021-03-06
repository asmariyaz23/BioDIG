require.config({
    shim: {
        jquery: {
            init: function() {
                return $;
            }
        },
        bootstrap: ['jquery'],
        jquery_ui: ['jquery'],
        underscore : {
            exports : '_'
        }
    },
    paths: {
        jquery: 'lib/jquery-1.11.0.min',
        underscore: 'lib/underscore.min',
        bootstrap: 'lib/bootstrap.min',
        settings: 'lib/settings',
        jquery_ui: 'lib/jquery-ui-1.10.4.min',
        text: 'lib/require-text'
    }
});

/*var deps = [
    'jquery', 'underscore', 'settings', 'biodig/ui/zoomable/ZoomableHome', 'biodig/ui/users/Login',
    'biodig/ui/users/Register', 'text!biodig/tmpl/helpbox/home.html', 'bootstrap', 'jquery_ui'
];*/

var deps = [
    'jquery', 'underscore', 'settings', 'biodig/ui/users/Login',
    'biodig/ui/users/Register', 'biodig/ui/home/imageRectangles','text!biodig/tmpl/helpbox/home.html', 'bootstrap', 'jquery_ui'
];


require(deps, function($, _, settings, Login, Register,imageRectangles, HelpBox) {

    // setup login, register, and logout forms
    var login = Login.create();
    $('.login > a').on('click', function() {
        login.show();
    });

    var register = Register.create();
    $('.register > a').on('click', function() {
        register.show();
    });

    $('.logout > a').on('click', function() {
        var form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", settings.SITE_URL + "logout/");
        document.body.appendChild(form);
        form.submit();
    });

    $(function() {
        $( "#selectable" ).selectable();
    });

    $('#search_selected button').bind('click', function() {
        var selected_id = $('.ui-selected').map(function() {
            return this.id;
        }).get().join(',');

        if (selected_id != "") {
              var form = document.createElement("form");
            form.setAttribute("method", "get");
            form.setAttribute("action", settings.SITE_URL + "search/");
            hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "organismId");
            hiddenField.setAttribute("value", selected_id);
            form.appendChild(hiddenField);
            form.appendChild($('#searchGenomes').clone()[0]);
            form.appendChild($('#searchImages').clone()[0]);
            document.body.appendChild(form);
            form.submit();
        }
    });

    $('#mycoplasma_selector_menu ol li').dblclick(function() {
        var form = document.createElement("form");
        form.setAttribute("method", "get");
        form.setAttribute("action", settings.SITE_URL + "search/");
        hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", "organismId");
        hiddenField.setAttribute("value", $(this).attr('id'));
        form.appendChild(hiddenField);
        form.appendChild($('#searchGenomes').clone()[0]);
        form.appendChild($('#searchImages').clone()[0]);
        document.body.appendChild(form);
        form.submit();
    });

    /*ZoomableUIHome.create('#phylogenetic_tree', {
        height: 800,
        width: 940,
        actualImageSrc: settings.STATIC_URL + 'images/mycoplasma_tree_hiRes.png'
    });*/
    
    imageRectangles.create('#myImage')
    
    
    var helpDialog = $(_.template(HelpBox)(settings));

    $('#helpButton').click(function() {
        var box = $(helpDialog.attr('id'));
        if (box.length > 0) {
            box.modal('show');
        }
        else {
            helpDialog.appendTo($('body')).modal();
        }
    });
});
