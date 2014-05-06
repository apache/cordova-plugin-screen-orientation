package net.yoik.cordova.plugins.screenorientation;

import org.apache.cordova.CallbackContext;

import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.app.Activity;
import android.content.pm.ActivityInfo;
import android.util.Log;
import android.webkit.CookieSyncManager;
import android.widget.Toast;


public class YoikScreenOrientation extends CordovaPlugin {

    private static final String TAG = "YoikScreenOrientation";

    /**
     * Screen Orientation Constants
     */

    // Refer to
    // http://developer.android.com/reference/android/R.attr.html#screenOrientation

    private static final String UNSPECIFIED = "unspecified";
    private static final String LANDSCAPE = "landscape";
    private static final String PORTRAIT = "portrait";
    private static final String USER = "user";
    private static final String BEHIND = "behind";
    private static final String SENSOR = "sensor";
    private static final String NOSENSOR = "nosensor";
    private static final String SENSOR_LANDSCAPE = "sensorLandscape";
    private static final String SENSOR_PORTRAIT = "sensorPortrait";
    private static final String REVERSE_LANDSCAPE = "reverseLandscape";
    private static final String REVERSE_PORTRAIT = "reversePortrait";
    private static final String FULL_SENSOR = "fullSensor";

    // an index for the toast message
    private static final int TOAST_MESSAGE_INDEX = 0;


    @Override
    public boolean execute(String action, JSONArray args,
                           CallbackContext callbackContext) {

        Log.d(TAG, "execute action: " + action);

        // Route the Action
        if (action.equals("screenOrientation")) {
            return routeScreenOrientation(args, callbackContext);
        }

        // Action not found
        callbackContext.error("action not recognised");
        return false;
    }

    /**
     * Screen Orientation Methods
     *
     * @author Ronald Diaz <r.diaz@pni.com.au>
     * @return boolean
     */
    private boolean routeScreenOrientation(JSONArray args,
                                           CallbackContext callbackContext) {

        String action = args.optString(0);

        if (action.equals("set")) {

            String orientation = args.optString(1);

            Log.d(TAG, "Requested ScreenOrientation: " + orientation);

            Activity activity = cordova.getActivity();

            Log.d(TAG, "ROUTING SET");

            if (orientation.equals(UNSPECIFIED)) {
                activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
            } else if (orientation.equals(LANDSCAPE)) {
                activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
            } else if (orientation.equals(PORTRAIT)) {
                activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
            } else if (orientation.equals(USER)) {
                activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_USER);
            } else if (orientation.equals(BEHIND)) {
                activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_BEHIND);
            } else if (orientation.equals(SENSOR)) {
                activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR);
            } else if (orientation.equals(NOSENSOR)) {
                activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_NOSENSOR);
            } else if (orientation.equals(SENSOR_LANDSCAPE)) {
                activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE);
            } else if (orientation.equals(SENSOR_PORTRAIT)) {
                activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_PORTRAIT);
            } else if (orientation.equals(REVERSE_LANDSCAPE)) {
                activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_REVERSE_LANDSCAPE);
            } else if (orientation.equals(REVERSE_PORTRAIT)) {
                activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_REVERSE_PORTRAIT);
            } else if (orientation.equals(FULL_SENSOR)) {
                activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_FULL_SENSOR);
            }

            callbackContext.success();
            return true;

        } else {

            callbackContext.error("ScreenOrientation not recognised");
            return false;
        }

    }


}