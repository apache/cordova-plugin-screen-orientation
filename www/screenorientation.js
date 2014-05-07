/*
The MIT License (MIT)

Copyright (c) 2014

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec'),
    Constants = {
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
    },
    currOrientation = Constants.Orientation.UNSPECIFIED;

var orientationExports = {};

// Tack on the orientation Constants to the base plugin.
for (var key in Constants) {
    orientationExports[key] = Constants[key];
}

orientationExports.setOrientation = function(successCallback, errorCallback, orientation) {
    if (typeof successCallback == "string") {
        orientation = successCallback;
        successCallback = function(){};
        errorCallback = function(){};
    }

    currOrientation = orientation ? orientation : Constants.Orientation.UNSPECIFIED;

    exec(successCallback, errorCallback, "YoikScreenOrientation", "screenOrientation", ['set', currOrientation]);
};

// ios orientation callback/hook
window.shouldRotateToOrientation = function(orientation) {
    var o = Constants.Orientation;
    switch (currOrientation) {
        case o.PORTRAIT:
        case o.SENSOR_PORTRAIT:
            if (orientation === 0) return true;
        break;
        case o.LANDSCAPE:
        case o.SENSOR_LANDSCAPE:
            if (orientation === -90) return true;
        break;
        case o.REVERSE_LANDSCAPE:
            if (orientation === 90) return true;
        break;
        case o.REVERSE_PORTRAIT:
            if (orientation === 180) return true;
        break;
        case o.FULL_SENSOR:
            return true;
        break;
        case o.SENSOR:
        case o.UNSPECIFIED:
            if (orientation === -90 || orientation === 90 || orientation === 0) return true;
        break;
    }

    return false;
}

module.exports = orientationExports;