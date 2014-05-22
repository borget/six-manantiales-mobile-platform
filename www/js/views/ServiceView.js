app.views.ServiceView = Backbone.View.extend({

    initialize: function () {
        
    },

    render: function () {
        this.$el.html(this.template());

        return this;
    },
    
    events: {
        "click .btn-back": "back"
    },

    back: function() {
        window.history.back();
        return false;
    }

});
