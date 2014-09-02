var exec = require('cordova/exec'),
    screenOrientation = {};

screenOrientation.setOrientation = function(orientation) {
    exec(null, null, "YoikScreenOrientation", "screenOrientation", ['set', orientation]);
};

module.exports = screenOrientation;

// ios orientation callback/hook
window.shouldRotateToOrientation = function(orientation) {
    var currOrientation = cordova.plugins.screenorientation.currOrientation,
        orientationMap  = {
            'portrait': [0,180],
            'portrait-primary': [0],
            'portrait-secondary': [180],
            'landscape': [-90,90],
            'landscape-primary': [-90],
            'landscape-secondary': [90],
            'default': [-90,90,0]
        },
        map = orientationMap[currOrientation] || orientationMap['default'];

    return map.indexOf(orientation) >= 0;
};
