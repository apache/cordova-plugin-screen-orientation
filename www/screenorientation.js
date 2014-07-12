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
            PORTRAIT_PRIMARY: 'portrait-primary',
            // The orientation is in the primary portrait mode.
            PORTRAIT_SECONDARY: 'portrait-secondary',
            // The orientation is in the secondary portrait mode.
            LANDSCAPE_PRIMARY: 'landscape-primary',
            // The orientation is in the primary landscape mode.
            LANDSCAPE_SECONDARY: 'landscape-secondary',
            // The orientation is in the secondary landscape mode.
            PORAIT: 'portrait',
            // The orientation is either portrait-primary or portrait-secondary.
            LANDSCAPE: 'landscape',
            // The orientation is either landscape-primary or landscape-secondary.
            UNLOCKED: 'unlocked'
        }
    },
    currOrientation = Constants.Orientation.UNLOCKED;

var orientationExports = {};

// Tack on the orientation Constants to the base plugin.
for (var key in Constants) {
    orientationExports[key] = Constants[key];
}

function setOrientation(successCallback, errorCallback, orientation) {
    currOrientation = orientation ? orientation : Constants.Orientation.UNSPECIFIED;

    exec(successCallback, errorCallback, "YoikScreenOrientation", "screenOrientation", ['set', currOrientation]);
}

function fireEvent(obj) {
    var event = document.createEvent('HTMLEvents');

    event.initEvent('orientationchange', true, true);
    event.eventName = 'orientationchange';
    // screen.dispatchEvent(event);
}

function addScreenOrientationApi(obj) {
    if (obj.unlockOrientation || obj.lockOrientation) {
        return;
    }

    var successCallback = function() {
            fireEvent(obj);
        },
        errorCallback = function(){};

    obj.lockOrientation = function(orientation) {
        // if (Object.keys(Constants.Orientation).indexOf(orientation) == -1) {
        //     return;
        // }

        setOrientation(successCallback, errorCallback, orientation);
    };

    obj.unlockOrientation = function() {
        setOrientation(successCallback, errorCallback, Constants.Orientation.UNLOCKED);
    };
}

addScreenOrientationApi(screen);

// ios orientation callback/hook
window.shouldRotateToOrientation = function(orientation) {
    var o = Constants.Orientation;
    switch (currOrientation) {
        case o.PORTRAIT:
        case o.PORTRAIT_PRIMARY:
            if (orientation === 0) return true;
        break;
        case o.LANDSCAPE:
        case o.LANDSCAPE_PRIMARY:
            if (orientation === -90) return true;
        break;
        case o.LANDSCAPE_SECONDARY:
        case o.LANDSCAPE:
            if (orientation === 90) return true;
        break;
        case o.PORTRAIT:
        case o.PORTRAIT_SECONDARY:
            if (orientation === 180) return true;
        break;
        case o.UNLOCKED:
            if (orientation === -90 || orientation === 90 || orientation === 0) return true;
        break;
    }
    return false;
};

module.exports = orientationExports;