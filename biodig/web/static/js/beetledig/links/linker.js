
deps  = ['jquery'];
define (deps, function($) {
    var linker = {
        'link' : function(ortholog,link,name) {
            if (name.toLowerCase() == 'flybase') { 
                params = {"species":"Dmel","db":"fbgn","caller":"quicksearch",
                      "context":ortholog};
                method = "GET";
            }
            else if (name.toLowerCase() == 'orthodb'){
                params = {"searchtext":ortholog};
                method = "POST";                  
            }
            else if (name.toLowerCase() == "ibeetle"){
                method = "GET";
                params = {"details":ortholog};
            }
            else {
                  alert(ortholog,link);
            }
            form = $('<form>');
            form.attr("target","_blank");
            if (name.toLowerCase() == "orthodb" || name.toLowerCase() == "flybase") {
                form.attr("method",method);
                form.attr("action",link);
                var addField = function(key,value){
                    var input = $('<input type="hidden">');
                    input.attr({ 'name': key,
                             'value' : value});
                    form.append(input);
                };
                if(params instanceof Object){
                   for(var key in params){
                     addField(key, params[key]);
                   }
                }
            }
            else if (name.toLowerCase() == "ibeetle"){
                 form.attr("action",link + ortholog)
            }  
            form.appendTo(document.body);
            form.submit();
            form.remove(); 
        }
    }
    return linker;
});
         
