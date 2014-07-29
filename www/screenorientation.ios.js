var exec = require('cordova/exec'),
    screenOrientation = {};

screenOrientation.setOrientation = function(orientation) {
    exec(null, null, "YoikScreenOrientation", "screenOrientation", ['set', orientation]);
};

module.exports = screenOrientation;

// ios orientation callback/hook
window.shouldRotateToOrientation = function(orientation) {
    var currOrientation = cordova.plugins.screenorientation.currOrientation;
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