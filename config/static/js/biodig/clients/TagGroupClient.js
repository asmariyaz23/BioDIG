var deps = [
    'jquery','biodig/clients/URLBuilderFactory', 'settings', 'lib/util'
]

define(deps, function($, URLBuilder, settings, util) {

    /**
     *  Validator for a TagGroup client.
    **/
    var ValidatorFactory = {
        getInstance: function() {
            // validator
            return {
                create: function(name) {
                    if (!name) throw { detail : 'Not a valid name' }
                },
                get: function(tagGroupId) {
                    if (!tagGroupId || isNaN(TagGroupid)) throw { detail : 'The id is not a valid positive number' }
                },
                list: function(opts) {
                    if ('owner' in opts) {
                        if (!opts['owner'] || isNaN(opts['owner'])) throw { detail : 'The owner is not a valid positive number' }
                    }
                    if ('name' in opts) {
                        if (!opts['name']) throw { detail : 'Not a valid name' }
                    }
                },
                update: function(id, name) {
                    if (!id || isNaN(id)) throw { detail : 'The id is not a valid positive number' }
                    if (!name) throw { detail : 'Not a valid name' }
                },
                delete: function(id) {
                    if (!id || isNaN(id)) throw { detail : 'The id is not a valid positive number' }
                }
            }
        }
    };

    /**
     *  TagGroupClient constructor that takes in the options
     *  such as url.
     *
     *  @param opts: The options to customize this client.
    **/
    function TagGroupClient(opts) {
        if (! ('image_id' in opts)){
            throw { detail : 'Image ID is necessary for TagGroup Client use' };
        }

        this.url = util.format(opts.url, opts.image_id);
        if (this.url[this.url.length -1] != '/') {
            this.url += '/';
        }

        this.validator = ValidatorFactory.getInstance();
        this.token = opts.token || null;
    }

    TagGroupClient.prototype.create = function(name) {
        try {
            this.validator.create(name);
        }
        catch (e) {
            return $.Deferred(function(deferredObj) {
                deferredObj.reject(e);
            }).promise();
        }

        var self = this;

        return $.Deferred(function(deferredObj) {
            $.ajax({
                url : self.url,
                method : 'POST',
                beforeSend : util.auth(self.token),
                dataType : 'json',
                data : {
                    name: name
                },
                success : function(data) {
                    deferredObj.resolve(data);
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    try {
                        var e = $.parseJSON(jqXHR.responseText);
                        deferredObj.reject(e);
                    }
                    catch (e) {
                        deferredObj.reject({ detail: 'An unidentified error occurred with the server.'});
                    }
                }
            });

        }).promise();
    };

    TagGroupClient.prototype.get = function(id) {
        try {
            this.validator.get(id);
        }
        catch (e) {
            return $.Deferred(function(deferredObj) {
                deferredObj.reject(e);
            }).promise();
        }

        var self = this;

        return $.Deferred(function(deferredObj) {
            $.ajax({
                url : self.url + id,
                method : 'GET',
                beforeSend : util.auth(self.token),
                dataType : 'json',
                success : function(data) {
                    deferredObj.resolve(data);
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    try {
                        var e = $.parseJSON(jqXHR.responseText);
                        deferredObj.reject(e);
                    }
                    catch (e) {
                        deferredObj.reject({ detail: 'An unidentified error occurred with the server.'});
                    }
                }
            });

        }).promise();
    };

    TagGroupClient.prototype.list = function(opts) {
        try {
            if (!opts) opts = {};
            this.validator.list(opts);
        }
        catch (e) {
            return $.Deferred(function(deferredObj) {
                deferredObj.reject(e);
            }).promise();
        }

        var urlBuilder = URLBuilder.newBuilder(this.url);
        if (!opts)
        $.each(opts, function(key, val) {
            urlBuilder.addQuery(key, val, URLBuilder.NOT_EMPTY);
        });

        var self = this;

        return $.Deferred(function(deferredObj) {
            $.ajax({
                url: urlBuilder.complete(),
                method: 'GET',
                beforeSend : util.auth(self.token),
                success: function(data, textStatus, jqXHR) {
                    deferredObj.resolve(data);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    try {
                        var e = $.parseJSON(jqXHR.responseText);
                        deferredObj.reject(e);
                    }
                    catch (e) {
                        deferredObj.reject({ detail: 'An unidentified error occurred with the server.'});
                    }
                }
           });
        }).promise();
    };

    TagGroupClient.prototype.update = function(id, name) {
        try {
            this.validator.update(id, name);
        }
        catch (e) {
            return $.Deferred(function(deferredObj) {
                deferredObj.reject(e);
            }).promise();
        }
        var self = this;
        var data = {
            'name' : name
        };

        return $.Deferred(function(deferredObj) {
            $.ajax({
                crossDomain: false,
                url: self.url + id,
                method: 'PUT',
                beforeSend : util.auth(self.token),
                data: data,
                success: function(data) {
                    deferredObj.resolve(data);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    try {
                        var e = $.parseJSON(jqXHR.responseText);
                        deferredObj.reject(e);
                    }
                    catch (e) {
                        deferredObj.reject({ detail: 'An unidentified error occurred with the server.'});
                    }
                }
            });
        }).promise();
    };

    TagGroupClient.prototype.delete = function(id) {
        try {
            this.validator.delete(id);
        }
        catch (e) {
            return $.Deferred(function(deferredObj) {
                deferredObj.reject(e);
            }).promise();
        }

        var self = this;

        return $.Deferred(function(deferredObj) {
            $.ajax({
                url: self.url + id,
                beforeSend: util.auth(self.token),
                method: 'DELETE',
                success: function(data) {
                    deferredObj.resolve(data);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    try {
                        var e = $.parseJSON(jqXHR.responseText);
                        deferredObj.reject(e);
                    }
                    catch (e) {
                        deferredObj.reject({ detail: 'An unidentified error occurred with the server.'});
                    }
                }
            });
        }).promise();
    }


    var defaults = {
        url : settings.SITE_URL + 'rest/v2/images/{0}/tagGroups/'
    };

    var TagGroupClientFactory = {
        create : function(opts) {
            return new TagGroupClient($.extend({}, defaults, opts));
        }
    };

    return TagGroupClientFactory;
});
