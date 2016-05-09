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

#import "YoikScreenOrientation.h"

@implementation YoikScreenOrientation

-(void)screenOrientation:(CDVInvokedUrlCommand *)command
{
    [self.commandDelegate runInBackground:^{

        NSArray* arguments = command.arguments;
        NSString* orientationIn = [arguments objectAtIndex:1];

        // grab the device orientation so we can pass it back to the js side.
        NSString *orientation;
        switch ([[UIDevice currentDevice] orientation]) {
            case UIDeviceOrientationLandscapeLeft:
                orientation = @"landscape-secondary";
                break;
            case UIDeviceOrientationLandscapeRight:
                orientation = @"landscape-primary";
                break;
            case UIDeviceOrientationPortrait:
                orientation = @"portrait-primary";
                break;
            case UIDeviceOrientationPortraitUpsideDown:
                orientation = @"portrait-secondary";
                break;
            default:
                orientation = @"portait";
                break;
        }

        if ([orientationIn isEqual: @"unlocked"]) {
            orientationIn = orientation;
        }

        // we send the result prior to the view controller presentation so that the JS side
        // is ready for the unlock call.
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
            messageAsDictionary:@{@"device":orientation}];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

        // SEE https://github.com/Adlotto/cordova-plugin-recheck-screen-orientation
        // HACK: Force rotate by changing the view hierarchy. Present modal view then dismiss it immediately
        // This has been changed substantially since iOS8 broke it...
        ForcedViewController *vc = [[ForcedViewController alloc] init];
        vc.calledWith = orientationIn;

        // backgound should be transparent as it is briefly visible
        // prior to closing.
        vc.view.backgroundColor = [UIColor clearColor];
        // vc.view.alpha = 0.0;
        vc.view.opaque = YES;

#if __IPHONE_OS_VERSION_MAX_ALLOWED >= 80000
        // This stops us getting the black application background flash, iOS8
        vc.modalPresentationStyle = UIModalPresentationOverFullScreen;
#endif

        dispatch_async(dispatch_get_main_queue(), ^{
            [self.viewController presentViewController:vc animated:NO completion:^{
                // added to support iOS8 beta 5, @see issue #19
                dispatch_after(0, dispatch_get_main_queue(), ^{
                    [self.viewController dismissViewControllerAnimated:NO completion:nil];
                });
            }];
        });

    }];
}

@end

@implementation ForcedViewController

- (UIInterfaceOrientationMask) supportedInterfaceOrientations
{
    if ([self.calledWith rangeOfString:@"portrait"].location != NSNotFound) {
        return UIInterfaceOrientationMaskPortrait;
    } else if([self.calledWith rangeOfString:@"landscape"].location != NSNotFound) {
        return UIInterfaceOrientationMaskLandscape;
    }
    return UIInterfaceOrientationMaskAll;
}
@end