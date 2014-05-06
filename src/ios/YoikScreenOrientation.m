//
//  Utility.m
//  Yoik
//
//  Created by Nick Luo on 14/06/13.
//
//

#import "YoikScreenOrientation.h"

// #import "AppDelegate.h"
// #import "MainViewController.h"
// #import "TempViewController.h"

@implementation YoikScreenOrientation


-(void)screenOrientation:(CDVInvokedUrlCommand *)command
{
    // NSString *action = [command.arguments objectAtIndex:0];

    // AppDelegate *delegate = [UIApplication sharedApplication].delegate;

    // MainViewController *viewController =(MainViewController *)delegate.viewController;

    // if ([action isEqual:@"portrait"]) {
    //     [viewController forcePortrait];
    // } else {
    //     [viewController forceLandscape];
    // }

    // TempViewController *temp = [[[TempViewController alloc] init] autorelease];

    // [delegate.viewController presentViewController:temp animated:NO completion:^{
    //     [temp dismissModalViewControllerAnimated:NO];

    //     CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    //     [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

    // }];

    // HACK: Force rotate by changing the view hierarchy. Present modal view then dismiss it immediately.
    [self.viewController presentViewController:[UIViewController new] animated:NO completion:^{ [self.viewController dismissViewControllerAnimated:NO completion:nil]; }];

    // Assume everything went ok
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

}

@end
