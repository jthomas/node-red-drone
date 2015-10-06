var events = [ "landed", "hovering", "flying", "landing", "batteryChange", "altitudeChange" ]
var streams = [ "pictures", "telemetry", "gps" ]
var commands = [ "photo", "status", "location"]

module.exports = function (RED) {
  function Constructor (config) {
    RED.nodes.createNode(this, config)
    var node = this

    var ignore_stream = {}

    var ip_address = RED.nodes.getNode(config.ip_address)
    var client = ip_address.connection.client

    events.forEach(function (event) {
      if (!config[event]) return

      var listener = function (data) {
        node.send({payload: event, data: data})
      }

      client.on(event, listener)
    })

    streams.forEach(function (stream) {
      if (!config[stream]) return

      var listener = function (data) {
        if (ignore_stream[stream]) return

        node.send({payload: stream, data: data})

        var delay = config[stream + "_delay"]
        if (delay) {
          ignore_stream[stream] = true
          setTimeout(function () {
            ignore_stream[stream] = false
          }, delay)
        }
      }

      client.on(stream, listener)
    })

    commands.forEach(function (command) {
      var listener = function (data) {
        node.send({payload: command, data: data})
      }

      client.on(command, listener)
    })

    this.on('close', function() {
      events.concat(streams, commands).forEach(client.removeAllListeners.bind(client))
    });
  }

  RED.nodes.registerType('drone-data', Constructor)
}
