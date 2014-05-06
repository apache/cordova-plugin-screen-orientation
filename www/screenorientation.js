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
    argscheck.checkArgs('fFs', 'screenorientation.setOrientation', arguments);

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
		case o.UNSPECIFIED:
			if (orientation === -90 || orientation === 90 || orientation === 0) return true;
		break;
	}

	return false;
}

module.exports = orientationExports;