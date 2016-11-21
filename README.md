<!--
# license: Licensed to the Apache Software Foundation (ASF) under one
#         or more contributor license agreements.  See the NOTICE file
#         distributed with this work for additional information
#         regarding copyright ownership.  The ASF licenses this file
#         to you under the Apache License, Version 2.0 (the
#         "License"); you may not use this file except in compliance
#         with the License.  You may obtain a copy of the License at
#
#           http://www.apache.org/licenses/LICENSE-2.0
#
#         Unless required by applicable law or agreed to in writing,
#         software distributed under the License is distributed on an
#         "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
#         KIND, either express or implied.  See the License for the
#         specific language governing permissions and limitations
#         under the License.
-->

# Cordova Screen Orientation Plugin

Cordova plugin to set/lock the screen orientation in a common way for iOS, Android, WP8 and Blackberry 10.  This plugin is based on an early version of [Screen Orientation API](http://www.w3.org/TR/screen-orientation/) so the api does not currently match the current spec.

The plugin adds the following to the screen object (`window.screen`):

```js
// lock the device orientation
.lockOrientation('portrait')

// unlock the orientation
.unlockOrientation()

// current orientation
.orientation
```

## Install

_cordova < 4_

```bash
cordova plugin add net.yoik.cordova.plugins.screenorientation
```
_cordova > 4_

```bash
cordova plugin add cordova-plugin-screen-orientation
```

## Supported Orientations

#### portrait-primary
> The orientation is in the primary portrait mode.

#### portrait-secondary
> The orientation is in the secondary portrait mode.

#### landscape-primary
> The orientation is in the primary landscape mode.

#### landscape-secondary
> The orientation is in the secondary landscape mode.

#### portrait
> The orientation is either portrait-primary or portrait-secondary (sensor).

#### landscape
> The orientation is either landscape-primary or landscape-secondary (sensor).

## Usage

```js
// set to either landscape
screen.lockOrientation('landscape');

// allow user rotate
screen.unlockOrientation();

// access current orientation
console.log('Orientation is ', screen.orientation);
```

## Events

Both android and iOS will fire the orientationchange event on the window object.
For this version of the plugin use the window object if you require notification.

For this plugin to follow the full API events should be fired on the screen object.
iOS and BB10 do not currently support events on the _screen_ object so custom event
handling will need to be added (Suggestions welcome!).

### Example usage

```js
window.addEventListener("orientationchange", function(){
    console.log(screen.orientation); // e.g. portrait
});
```

## Android Notes

The __screen.orientation__ property will not update when the phone is [rotated 180 degrees](http://www.quirksmode.org/dom/events/orientationchange.html).

## iOS Notes

The iOS version is a combination of the cordova JS callback _window.shouldRotateToOrientation_ and the workaround to recheck the orientation as implemented in https://github.com/Adlotto/cordova-plugin-recheck-screen-orientation.

__If you have a custom implementation of the _window.shouldRotateToOrientation_ it will have to be removed for the plugin to function as expected.__

#### iOS6

There has been a few cases where the rotation does not change the width of the viewport

Issue [#1](https://github.com/gbenvenuti/cordova-plugin-screen-orientation/issues/1) @dokterbob

>It seems to be related to having width=device-width, height=device-height in the meta viewport (which is part of the boilerplate phonegap/cordova app). It can be solved by updating the viewport with width=device-height, height=device-width or simply removing width and height altogether.

#### iOS8

Versions prior to 1.2.0 will cause an application crash in iOS8 due to a change in presentViewController timing.

## BB10 Notes

Wraps the com.blackberry.app plugin functions, auto installed as a dependancy.

## WP8 Notes

Windows phone does not support specification or primary and secondary orientations.  If called with a specific orientation the plugin will just apply the landscape or portait orientation.

## W8.1 Notes

Windows 8.1 Applicaitons (runtime/metro applications) will only display orientation changes if the device has some sort of accelerometer.  The internal state of the "orientation" will still be kept, but the actual screen won't rotate unless the device supports it.

# Changelog

## 1.4.2
* [#101](https://github.com/gbenvenuti/cordova-plugin-screen-orientation/pull/101) make iOS rotate as needed when lockOrientation is called

## 1.4.1
* [#89](https://github.com/gbenvenuti/cordova-plugin-screen-orientation/pull/89) Fix for cordova >= 3.6.3

## 1.4.0
* Added Windows 8.1 Support
* [#54](https://github.com/gbenvenuti/cordova-plugin-screen-orientation/pull/54) Background thread for ios
* [#64](https://github.com/gbenvenuti/cordova-plugin-screen-orientation/pull/64) Orientation naming bug fixed
* Add portrait upside down to iOS default orientations

## 1.3.5-6
* Plugin added to npm

## 1.3.4
* Readme update

## 1.3.3
* [#53](https://github.com/gbenvenuti/cordova-plugin-screen-orientation/pull/53) WP8 Support

## 1.3.2

* [#33](https://github.com/gbenvenuti/cordova-plugin-screen-orientation/issues/33) iOS8 Delay Block

## 1.3.0

* [#23](https://github.com/gbenvenuti/cordova-plugin-screen-orientation/issues/23) iOS8 flicker

## 1.2.0-1.2.1

* [#19](https://github.com/gbenvenuti/cordova-plugin-screen-orientation/issues/19) iOS8 Crash



Pull requests welcome.
