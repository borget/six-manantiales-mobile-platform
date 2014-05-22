/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements. See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership. The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License. You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied. See the License for the
* specific language governing permissions and limitations
* under the License.
*/

function registerPushwooshAndroid() {

  var pushNotification = window.plugins.pushNotification;

//push notifications handler
document.addEventListener('push-notification', function(event) {

var notification = JSON.parse(JSON.stringify(event.notification));

navigator.notification.alert(
    notification.header +" "+notification.title,  // message
    null,         // callback
    'Six Manantiales',    // title
    null                  // buttonName
);

});

//projectid: "GOOGLE_PROJECT_ID", appid : "PUSHWOOSH_APP_ID"
pushNotification.registerDevice({ projectid: "571639998925", appid : "F6911-30D79" },
function(token) {
console.log(token);
//callback when pushwoosh is ready
onPushwooshAndroidInitialized(token);
},
function(status) {
console.log("failed to register: " + status);
console.warn(JSON.stringify(['failed to register ', status]));
});
 }

function onPushwooshAndroidInitialized(pushToken)
{
//output the token to the console
console.warn('push token: ' + pushToken);

var pushNotification = window.plugins.pushNotification;

pushNotification.getTags(function(tags) {
console.warn('tags for the device: ' + JSON.stringify(tags));
},
function(error) {
console.warn('get tags error: ' + JSON.stringify(error));
});

pushNotification.setLightScreenOnNotification(false);

pushNotification.setTags({deviceName:"SixManantiales", deviceId:102894},
function(status) {
console.warn('setTags success');
},
function(status) {
console.warn('setTags failed');
});


}

 function initPushwoosh() {
var pushNotification = window.plugins.pushNotification;
if(device.platform == "Android")
{
registerPushwooshAndroid();
pushNotification.onDeviceReady();
}
}

var app = {
	views: {},
    models: {},
    routers: {},
    utils: {},
    adapters: {},
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("offline", onOfflineHandler, false);
        document.addEventListener("online", onOnlineHandler, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        if (appHelper.checkConnection() !== "No network connection") {
            initPushwoosh();
        }        
        
		app.router = new app.routers.AppRouter();
		app.utils.templates.load(["HomeView", "EventsView","LocationView", "ServiceView", "AboutView"],
			function () {
				app.router = new app.routers.AppRouter();
				Backbone.history.start();
			});
    }
};

function onOfflineHandler() {
    navigator.notification.alert(
        'Se ha perdido la conexión a Internet!',  // message
        null,         // callback
        'Six Manantiales',    // title
        null                  // buttonName
    );
}

function onOnlineHandler() {
    appHelper.refreshCarousel();
    initPushwoosh();
}