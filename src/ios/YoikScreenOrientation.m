//
//  YoikScreenOrientation.m
//  Yoik
//
//  Created by Nick Luo on 14/06/13.
//
//

#import "YoikScreenOrientation.h"

@implementation YoikScreenOrientation

-(void)screenOrientation:(CDVInvokedUrlCommand *)command
{
    // HACK: Force rotate by changing the view hierarchy. Present modal view then dismiss it immediately.
    [self.viewController presentViewController:[UIViewController new] animated:NO completion:^{ [self.viewController dismissViewControllerAnimated:NO completion:nil]; }];

    // Assume everything went ok
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

}

@end
