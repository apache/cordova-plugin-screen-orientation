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


    var screenOrientation = {};
    if (!window.OrientationType) {
        window.OrientationType = {
            '0': 'portrait-primary',
            '180': 'portrait-secondary',
            '90': 'landscape-primary',
            '-90': 'landscape-secondary'
        };
    }
    if (!window.OrientationLockType) {
        window.OrientationLockType = {
            'portrait-primary': 1,
            'portrait-secondary': 2,
            'landscape-primary': 4,
            'landscape-secondary': 8,
            'portrait': 3, // either portrait-primary or portrait-secondary.
            'landscape': 12, // either landscape-primary or landscape-secondary.
            'any': 15 // All orientations are supported (unlocked orientation)
        };
    }
    var orientationMask = 1;
    screenOrientation.setOrientation = function(orientation) {
        orientationMask = window.OrientationLockType[orientation];
        cordova.exec(null, null, "CDVOrientation", "screenOrientation", [orientationMask, orientation]);
    };

    function addScreenOrientationApi(screenObject) {
        if (screenObject.unlock || screenObject.lock) {
            screenObject.nativeLock = screenObject.lock;
        }

        screenObject.lock = function(orientation) {
            var promiseLock;
            var p = new Promise(function(resolve, reject) {
                if (screenObject.nativeLock != null) {
                    promiseLock = screenObject.nativeLock(orientation);
                    promiseLock.then(function success(res) {
                    resolve();
                }, function error(err) {
                    screenObject.nativeLock = null;
                    resolveOrientation(orientation, resolve, reject);
                });
                } else {
                    resolveOrientation(orientation, resolve, reject);
                }
            })
            return p;
        }

        screenObject.unlock = function() {
            screenOrientation.setOrientation('any');
        };

    }
    function resolveOrientation(orientation, resolve, reject) {
        if (!OrientationLockType.hasOwnProperty(orientation)) {
            var err = new Error();
            err.name = "NotSupportedError";
            reject(err); //"cannot change orientation");
        } else {
            //screenOrientation.currOrientation = screenObject.orientation = orientation;
            screenOrientation.setOrientation(orientation);
            resolve("Orientation set"); // orientation change successful
        }

    }
    if (!screen.orientation) {
        screen.orientation = {};
    }
    addScreenOrientationApi(screen.orientation);
    orientationChange();

    function orientationChange() {
        screen.orientation.type = window.OrientationType[window.orientation];
               
    }
    window.addEventListener("orientationchange", orientationChange, true);
    module.exports = screenOrientation;
