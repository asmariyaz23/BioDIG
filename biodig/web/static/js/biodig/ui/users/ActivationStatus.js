var deps = [
    'jquery', 'underscore', 'settings', 'biodig/clients/UserClient', 'text!biodig/tmpl/users/activate.html'
];

define(deps, function($, _, settings, UserClient, ActivationStatusTmpl) {
    var ActivationStatusTemplate = _.template(ActivationStatusTmpl);

    function ActivationStatus(selector) {
        this.$container = $(selector);
        this.$el = $(ActivationStatusTemplate({ 'status' : 'BEGIN', 'settings' : settings }));
        this.$container.append(this.$el);
        this.client = UserClient.create();
    }

    ActivationStatus.prototype.start = function(user_id, activation_key) {
        var self = this;
        this.client.activate(user_id, activation_key)
            .done(function(user) {
                self.$el.remove();
                self.$el = $(ActivationStatusTemplate({
                    'status' : 'SUCCESS',
                    'user' : user,
                    'settings' : settings
                }));
                self.$container.append(self.$el);
            })
            .fail(function(e) {
                self.$el.remove();
                self.$el = $(ActivationStatusTemplate({
                    'status' : 'ERROR',
                    'detail' : e.detail || e.message,
                    'settings' : settings
                }));
                self.$container.append(self.$el);
            });
    };

    return {
        create: function(selector) {
            return new ActivationStatus(selector);
        }
    }
});
