cordova-yoik-screenorientation
==============================

Cordova plugin to set/lock the screen orientation in a common way for both iOS and Android.

Install
=
cordova plugin add https://github.com/yoik/cordova-yoik-screenorientation
  
Android
====
The android version is implemented via the standard _activity.setRequestedOrientation_ as used in other screen orientation plugins

iOS
====
The iOS version is a combination of the cordova JS callback _window.shouldRotateToOrientation_ and the workaround to recheck the orientation as implemented in https://github.com/Adlotto/cordova-plugin-recheck-screen-orientation.

If you have a custom impelemntation of the _window.shouldRotateToOrientation_ it will have to be removed for the plugin to function as expected.

Constants
====
    Orientation: {
        UNSPECIFIED: "unspecified",
        LANDSCAPE: "landscape",
        PORTRAIT: "portrait",
        USER: "user",
        BEHIND: "behind",
        SENSOR: "sensor",
        NOSENSOR: "nosensor",
        SENSOR_LANDSCAPE: "sensorLandscape",
        SENSOR_PORTRAIT: "sensorPortrait",
        REVERSE_LANDSCAPE: "reverseLandscape",
        REVERSE_PORTRAIT: "reversePortrait",
        FULL_SENSOR: "fullSensor"
    }

Usage
====

    var so = cordova.plugins.screenorientation;

    // with callbacks
    so.setOrientation(successCallback, errorCallback, so.Orientation.PORTRAIT);

    // no callbacks
    so.setOrientation(so.Orientation.SENSOR_LANDSCAPE);
