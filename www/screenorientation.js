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
    Orientations = [
        'portrait-primary',
        // The orientation is in the primary portrait mode.
        'portrait-secondary',
        // The orientation is in the secondary portrait mode.
        'landscape-primary',
        // The orientation is in the primary landscape mode.
        'landscape-secondary',
        // The orientation is in the secondary landscape mode.
        'portrait',
        // The orientation is either portrait-primary or portrait-secondary.
        'landscape'
        // The orientation is either landscape-primary or landscape-secondary.
    ],
    currOrientation = 'unlocked';

var orientationExports = {};

function setOrientation(orientation) {
    currOrientation = orientation ? orientation : 'unlocked';
    exec(null, null, "YoikScreenOrientation", "screenOrientation", ['set', currOrientation]);
}

function addScreenOrientationApi(obj) {
    if (obj.unlockOrientation || obj.lockOrientation) {
        return;
    }

    obj.lockOrientation = function(orientation) {
        if (Orientations.indexOf(orientation) == -1) {
            console.log('INVALID ORIENTATION', orientation);
            return;
        }
        setOrientation(orientation);
    };

    obj.unlockOrientation = function() {
        setOrientation('unlocked');
    };
}

addScreenOrientationApi(screen);

// ios orientation callback/hook
window.shouldRotateToOrientation = function(orientation) {
    switch (currOrientation) {
        case 'portrait':
        case 'portrait-primary':
            if (orientation === 0) return true;
        break;
        case 'landscape':
        case 'landscape-primary':
            if (orientation === -90) return true;
        break;
        case 'landscape':
        case 'landscape-secondary':
            if (orientation === 90) return true;
        break;
        case 'portrait':
        case 'portrait-secondary':
            if (orientation === 180) return true;
        break;
        default:
            if (orientation === -90 || orientation === 90 || orientation === 0) return true;
        break;
    }
    return false;
};

module.exports = {};