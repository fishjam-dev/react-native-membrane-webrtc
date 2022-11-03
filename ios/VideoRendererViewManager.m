#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(VideoRendererViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(trackId, NSString)
RCT_EXPORT_VIEW_PROPERTY(videoLayout, NSString)

@end
