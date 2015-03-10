function gbrowse(tc) {

    method = "POST";
    path = "http://beetlebase.org/cgi-bin/gbrowse/BeetleBase3.gff3/";
    params = {"#search":tc};
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);
   
    for (var key in params) {
        if(params.hasOwnProperty(key)) {
           var hiddenField = document.createElement("input");
           hiddenField.setAttribute("type", "hidden");
           hiddenField.setAttribute("name", key);
           hiddenField.setAttribute("value", params[key]);
           form.appendChild(hiddenField);
        }
    }
    
    document.body.appendChild(form);
    form.submit();
}
