#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(VideoPreviewViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(videoLayout, NSString)
RCT_EXPORT_VIEW_PROPERTY(mirrorVideo, BOOL)
RCT_EXPORT_VIEW_PROPERTY(captureDeviceId, NSString)

@end
