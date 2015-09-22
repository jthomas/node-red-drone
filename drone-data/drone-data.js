// TODO: 
// Allow you to choose which events to ignore
var events = [ "landed", "hovering", "flying", "landing", "batteryChange", "altitudeChange", "photo", "state" ]

module.exports = function (RED) {
  function Constructor (config) {
    RED.nodes.createNode(this, config)
    var node = this

    var ip_address = RED.nodes.getNode(config.ip_address)
    var client = ip_address.connection.client

    events.forEach(function (event) {
      client.on(event, function (data) {
        node.send({payload: event, data: data})
      }) 
    })
  }

  RED.nodes.registerType('drone-data', Constructor)
}
