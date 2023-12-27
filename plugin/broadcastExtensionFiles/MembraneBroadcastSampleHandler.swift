import Foundation
import MembraneRTC
import ReplayKit
import WebRTC
import os.log

/// App Group used by the extension to exchange buffers with the target application
let appGroup = "{{GROUP_IDENTIFIER}}"

let logger = OSLog(subsystem: "{{BUNDLE_IDENTIFIER}}.MembraneBroadcastSampleHandler", category: "Broadcaster")

/// An example `SampleHandler` utilizing `BroadcastSampleSource` from `MembraneRTC` sending broadcast samples and necessary notification enabling device's screencast.
class MembraneBroadcastSampleHandler: RPBroadcastSampleHandler {
    let broadcastSource = BroadcastSampleSource(appGroup: appGroup)
    var started: Bool = false

    override func broadcastStarted(withSetupInfo _: [String: NSObject]?) {
        started = broadcastSource.connect()

        guard started else {
            os_log("failed to connect with ipc server", log: logger, type: .debug)

            super.finishBroadcastWithError(NSError(domain: "", code: 0, userInfo: nil))

            return
        }

        broadcastSource.started()
    }

    override func broadcastPaused() {
        broadcastSource.paused()
    }

    override func broadcastResumed() {
        broadcastSource.resumed()
    }

    override func broadcastFinished() {
        broadcastSource.finished()
    }

    override func processSampleBuffer(_ sampleBuffer: CMSampleBuffer, with sampleBufferType: RPSampleBufferType) {
        guard started else {
            return
        }

        broadcastSource.processFrame(sampleBuffer: sampleBuffer, ofType: sampleBufferType)
    }
}
