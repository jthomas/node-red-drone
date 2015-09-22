// TODO: How can you show connected status?
var arDrone = require('../lib/ar-drone.js')

module.exports = function (RED) {
  function Constructor (n) {
    RED.nodes.createNode(this, n)
    this.connection = {
      ip_address: n.ip_address,
      client: arDrone.clientFactory(n.ip_address)
    }
  }

  RED.nodes.registerType('drone-config', Constructor)
}
