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

#import <Cordova/CDVViewController.h>
#import <objc/message.h>
#import <objc/runtime.h>

static char CDVOrientationSupportedOrientationsKey;

/*
 * Categories cannot add instance variables, so store the current orientation
 * list as an associated object on the CDVViewController instance.
 *
 * The screen-orientation plugin already represents supported orientations as
 * an NSArray of UIInterfaceOrientation NSNumber values. Cordova iOS versions
 * before 8 exposed compatible supportedOrientations accessors directly on
 * CDVViewController; Cordova iOS 8 removed them.
 */
static NSArray* CDVOrientationSupportedOrientations(id self, SEL _cmd)
{
    return objc_getAssociatedObject(self, &CDVOrientationSupportedOrientationsKey);
}

static void CDVOrientationSetSupportedOrientations(id self, SEL _cmd, NSArray* supportedOrientations)
{
    objc_setAssociatedObject(self,
                             &CDVOrientationSupportedOrientationsKey,
                             supportedOrientations,
                             OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

static UIInterfaceOrientationMask CDVOrientationCallSuperSupportedInterfaceOrientations(id self, SEL _cmd)
{
    struct objc_super superInfo = {
        .receiver = self,
        .super_class = class_getSuperclass([CDVViewController class])
    };

    return ((UIInterfaceOrientationMask (*)(struct objc_super*, SEL))objc_msgSendSuper)(&superInfo, _cmd);
}

static UIInterfaceOrientationMask CDVOrientationSupportedInterfaceOrientations(id self, SEL _cmd)
{
    NSArray* supportedOrientations = CDVOrientationSupportedOrientations(self, @selector(supportedOrientations));

    /*
     * If the plugin has not set a dynamic orientation lock, preserve UIKit's
     * default behavior. The app's Info.plist still limits the orientations iOS
     * will actually allow.
     */
    if (supportedOrientations.count == 0) {
        return CDVOrientationCallSuperSupportedInterfaceOrientations(self, _cmd);
    }

    UIInterfaceOrientationMask supportedInterfaceOrientations = 0;

    /*
     * UIInterfaceOrientationMask values are bit masks derived from
     * UIInterfaceOrientation values, e.g. UIInterfaceOrientationMaskPortrait
     * is 1 << UIInterfaceOrientationPortrait.
     */
    for (NSNumber* orientation in supportedOrientations) {
        supportedInterfaceOrientations = supportedInterfaceOrientations | (1 << orientation.integerValue);
    }

    if (supportedInterfaceOrientations == 0) {
        return CDVOrientationCallSuperSupportedInterfaceOrientations(self, _cmd);
    }

    return supportedInterfaceOrientations;
}

@interface CDVViewController (CDVOrientation)
@end

@implementation CDVViewController (CDVOrientation)

+ (void)load
{
    Class viewControllerClass = [CDVViewController class];

    /*
     * Cordova iOS 8 removed CDVViewController's supportedOrientations API, but
     * this plugin still uses setSupportedOrientations: to change the view
     * controller's allowed orientations at runtime.
     *
     * Add the removed accessors back only when the platform does not already
     * provide them. class_addMethod returns NO and leaves the existing method
     * untouched if CDVViewController already implements that selector.
     *
     * Also add supportedInterfaceOrientations when CDVViewController does not
     * implement it itself. That is the UIKit method iOS queries to determine the
     * orientations currently allowed by the view controller.
     */
    class_addMethod(viewControllerClass,
                    NSSelectorFromString(@"supportedOrientations"),
                    (IMP)CDVOrientationSupportedOrientations,
                    "@@:");

    class_addMethod(viewControllerClass,
                    NSSelectorFromString(@"setSupportedOrientations:"),
                    (IMP)CDVOrientationSetSupportedOrientations,
                    "v@:@");

    class_addMethod(viewControllerClass,
                    @selector(supportedInterfaceOrientations),
                    (IMP)CDVOrientationSupportedInterfaceOrientations,
                    "Q@:");
}

@end
