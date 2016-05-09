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

screenOrientation.setOrientation = function (orientation) {
    var orientationNumber;
    switch (orientation) {
        case 'landscape':
            orientationNumber = 5;
            break;
        case 'portrait':
            orientationNumber = 10;
            break;
        case 'landscape-primary':
            orientationNumber = 1;
            break;
        case 'landscape-secondary':
            orientationNumber = 4;
            break;
        case 'portrait-primary':
            orientationNumber = 2;
            break;
        case 'portrait-secondary':
            orientationNumber = 8;
            break;
        case 'unlocked':
            orientationNumber = 0;
            break;
        default:
            break;
    }
    Windows.Graphics.Display.DisplayInformation.autoRotationPreferences = orientationNumber;
};

module.exports = screenOrientation;
