/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */

/* global cordova, OrientationLockType */

var screenOrientation = {};
if (!window.OrientationType) {
    window.OrientationType = {
        'portrait-primary': 0,
        'portrait-secondary': 180,
        'landscape-primary': 90,
        'landscape-secondary': -90
    };
}
if (!window.OrientationLockType) {
    window.OrientationLockType = {
        'portrait-primary': 1,
        'portrait-secondary': 2,
        'landscape-primary': 4,
        'landscape-secondary': 8,
        portrait: 3, // either portrait-primary or portrait-secondary.
        landscape: 12, // either landscape-primary or landscape-secondary.
        any: 15 // All orientations are supported (unlocked orientation)
    };
}
var orientationMask = 1;
screenOrientation.setOrientation = function (orientation) {
    orientationMask = window.OrientationLockType[orientation];
    cordova.exec(null, null, 'CDVOrientation', 'screenOrientation', [orientationMask, orientation]);
};

screenOrientation.lock = function (orientation) {
    var p = new Promise(function (resolve, reject) {
        resolveOrientation(orientation, resolve, reject);
    });
    return p;
};

screenOrientation.unlock = function () {
    screenOrientation.setOrientation('any');
};

setOrientationProperties();

function resolveOrientation (orientation, resolve, reject) {
    if (!Object.prototype.hasOwnProperty.call(OrientationLockType, orientation)) {
        var err = new Error();
        err.name = 'NotSupportedError';
        reject(err); // "cannot change orientation");
    } else {
        screenOrientation.setOrientation(orientation);
        resolve('Orientation set'); // orientation change successful
    }
}

var onChangeListener = null;

Object.defineProperty(screenOrientation, 'onchange', {
    set: function (listener) {
        if (onChangeListener) {
            screenOrientation.removeEventListener('change', onChangeListener);
        }
        onChangeListener = listener;
        if (onChangeListener) {
            screenOrientation.addEventListener('change', onChangeListener);
        }
    },
    get: function () {
        return onChangeListener || null;
    },
    enumerable: true
});

var evtTarget = new XMLHttpRequest(); // document.createElement('div');
var orientationchange = function () {
    setOrientationProperties();
    var event = document.createEvent('Events');
    event.initEvent('change', false, false);
    evtTarget.dispatchEvent(event);
};

screenOrientation.addEventListener = function (a, b, c) {
    return evtTarget.addEventListener(a, b, c);
};

screenOrientation.removeEventListener = function (a, b, c) {
    return evtTarget.removeEventListener(a, b, c);
};

function setOrientationProperties () {
    switch (window.orientation) {
    case 0:
        screenOrientation.type = 'portrait-primary';
        break;
    case 90:
        screenOrientation.type = 'landscape-primary';
        break;
    case 180:
        screenOrientation.type = 'portrait-secondary';
        break;
    case -90:
        screenOrientation.type = 'landscape-secondary';
        break;
    default:
        screenOrientation.type = 'portrait-primary';
        break;
    }
    screenOrientation.angle = window.orientation || 0;
}
window.addEventListener('orientationchange', orientationchange, true);

module.exports = screenOrientation;
