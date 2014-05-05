app.routers.AppRouter = Backbone.Router.extend({

    routes: {
        "":			"home",
        "events":   "events",
        "about":    "about",
        "location": "location"

    },

    initialize: function () {
        app.slider = new PageSlider($('body'));
        app.googleMapInjected = false;
    },

    home: function () {
        // Since the home view never changes, we instantiate it and render it only once
        if (!app.homeView) {
            app.homeView = new app.views.HomeView();
            app.homeView.render();
            if (checkConnection() !== "No network connection") {
                getAvailablePromos();
            }
            
        } else {
            console.log('reusing home view');
            app.homeView.delegateEvents(); // delegate events when the view is recycled
        }
        app.slider.slidePage(app.homeView.$el);
        
    },

    events: function () {
        
        /*if (!app.aboutView) {*/
            app.eventsView = new app.views.EventsView();
            app.eventsView.render();
        /*} else {
            console.log('reusing about view');
            app.aboutView.delegateEvents(); // delegate events when the view is recycled
        }*/
        app.slider.slidePage(app.eventsView.$el);
    },
    
    about: function () {
        
        /*if (!app.aboutView) {*/
            app.aboutView = new app.views.AboutView();
            app.aboutView.render();
        /*} else {
            console.log('reusing about view');
            app.aboutView.delegateEvents(); // delegate events when the view is recycled
        }*/
        app.slider.slidePage(app.aboutView.$el);
    },
    
    location: function () {
        
        if (!app.locationView) {
        app.locationView = new app.views.LocationView();
        app.locationView.render();
        
        }

        app.slider.slidePage(app.locationView.$el);

        initGoogleMap();
    }

});
