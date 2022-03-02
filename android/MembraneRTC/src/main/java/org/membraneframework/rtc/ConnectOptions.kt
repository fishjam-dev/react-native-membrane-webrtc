package org.membraneframework.rtc

import org.membraneframework.rtc.transport.EventTransport
import org.membraneframework.rtc.utils.Metadata

public data class ConnectOptions(val transport: EventTransport, val config: Metadata)
