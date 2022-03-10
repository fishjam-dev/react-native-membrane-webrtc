package org.membraneframework.rtc

import org.membraneframework.rtc.transport.EventTransport
import org.membraneframework.rtc.utils.Metadata

/**
 * A set of connect options used by the <strong>MembraneRTC</strong> when connecting to the media server.
 * @property transport The transport implementation that will be used for media events exchanged by the client. Should be ready for <strong>connect</strong> method invocation
 * @property config The metadata that will be used by the transport to connect
 */
public data class ConnectOptions(val transport: EventTransport, val config: Metadata)
