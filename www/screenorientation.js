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

var screenOrientation = {},
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
    ];

screenOrientation.Orientations = Orientations;
screenOrientation.currOrientation = 'unlocked';

screenOrientation.setOrientation = function(orientation) {
    //platform specific files override this function
    console.log('setOrientation not supported on device');
};

function addScreenOrientationApi(screenObject) {
    if (screenObject.unlockOrientation || screenObject.lockOrientation) {
        return;
    }

    screenObject.lockOrientation = function(orientation) {
        if (Orientations.indexOf(orientation) == -1) {
            console.log('INVALID ORIENTATION', orientation);
            return;
        }
        screenOrientation.currOrientation = screenObject.orientation = orientation;
        screenOrientation.setOrientation(orientation);
    };

    screenObject.unlockOrientation = function() {
        screenOrientation.currOrientation = screenObject.orientation = 'unlocked';
        screenOrientation.setOrientation('unlocked');
    };
}

addScreenOrientationApi(screen);
orientationChange();

function orientationChange() {
    var orientation;

    switch (window.orientation) {
        case 0:
             orientation = 'portrait-primary';
             break;
        case 90:
            orientation = 'landscape-primary';
            break;
        case 180:
            orientation = 'portrait-secondary';
            break;
        case -90:
            orientation = 'landscape-secondary';
            break;
        default:
            orientation = 'unknown';
    }

    screen.orientation = orientation;
}

window.addEventListener("orientationchange", orientationChange, true);

module.exports = screenOrientation;