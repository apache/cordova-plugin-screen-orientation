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
        'portrait-secondary',
        'landscape-primary',
        'landscape-secondary',
        'portrait',  // either portrait-primary or portrait-secondary.
        'landscape', // either landscape-primary or landscape-secondary.
        'any'        // All orientations are supported (unlocked orientation)
    ];

screenOrientation.Orientations = Orientations;
screenOrientation.currOrientation = 'any';
var orientationMask = 0;
screenOrientation.setOrientation = function(orientation) {
    if(orientation == Orientations[0]){
        orientationMask = 1;
    }
    else if(orientation == Orientations[1]){
        orientationMask = 2;
    }
    else if(orientation == Orientations[2]){
        orientationMask = 4;
    }
    else if(orientation == Orientations[3]){
        orientationMask = 8;
    }
    else if(orientation == Orientations[4]){
        orientationMask = 3;
    }
    else if(orientation == Orientations[5]){
        orientationMask = 12;
    }
    else if(orientation == Orientations[6]){
        orientationMask = 15;
    }


    cordova.exec(null, null, "CDVOrientation", "screenOrientation", [orientationMask, orientation]);
    //console.log('setOrientation not supported on device');
};

function addScreenOrientationApi(screenObject) {
    if (screenObject.unlockOrientation || screenObject.lockOrientation) {
        return;
    }

    screenObject.lockOrientation = function(orientation) {

        var p = new Promise(function(resolve,reject){
            if (Orientations.indexOf(orientation) == -1) {
                var err = new Error();
                err.name = "NotSupportedError";
                reject(err);//"cannot change orientation");
            }
            else {
                screenOrientation.currOrientation = screenObject.orientation = orientation;
                screenOrientation.setOrientation(orientation);
                resolve("Orientation set"); // orientation change successful
            }
        });
        return p;
    };

    screenObject.unlockOrientation = function() {
        screenOrientation.currOrientation = screenObject.orientation = 'any';
        screenOrientation.setOrientation('any');
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
        orientation = 'any';
    }

    screen.orientation = orientation;
}

window.addEventListener("orientationchange", orientationChange, true);

module.exports = screenOrientation;
