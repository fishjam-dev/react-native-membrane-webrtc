/// A bunch of application specific constants
struct Constants {
    /// Remote media serer's url
    static let rtcEngineUrl = "http://192.168.83.221:4000"
    
    // for local development
    // static let rtcEngineUrl = "http://192.168.83.178:4000"
    
    /// App Group used for communicating with `Broadcast Upload Extension`
    static let appGroup = "group.example.reactnativemembrane"
    /// Bundle identifier of the `Broadcast Upload Extension` responsible for capturing screen and sending it to the applicaction
    static let screencastExtensionBundleId = "com.example.reactnativemembrane.ScreenBroadcast"
}
