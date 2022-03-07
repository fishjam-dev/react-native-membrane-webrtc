#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Membrane, NSObject)

RCT_EXTERN_METHOD(connect:(NSString)url withRoomName:(NSString)roomName
                  withDisplayName:(NSString)displayName
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

@end
