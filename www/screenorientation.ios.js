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

var exec = require('cordova/exec'),
    screenOrientation = {},
    iosOrientation = 'unlocked',
    orientationMap  = {
        'portrait': [0,180],
        'portrait-primary': [0],
        'portrait-secondary': [180],
        'landscape': [-90,90],
        'landscape-primary': [-90],
        'landscape-secondary': [90],
        'default': [-90,90,0,180]
    };

screenOrientation.setOrientation = function(orientation) {
    iosOrientation = orientation;

    var success = function(res) {
        if (orientation === 'unlocked' && res.device) {
            iosOrientation = res.device;
            setTimeout(function() {
                iosOrientation = 'unlocked';
            },300);
        }
    };

    exec(success, null, "YoikScreenOrientation", "screenOrientation", ['set', orientation]);
};

module.exports = screenOrientation;

// ios orientation callback/hook
window.shouldRotateToOrientation = function(orientation) {
    var map = orientationMap[iosOrientation] || orientationMap['default'];
    return map.indexOf(orientation) >= 0;
};
