module.exports = function (RED) {
  function Constructor (n) {
    RED.nodes.createNode(this, n)
    this.ip_address = n.ip_address
  }

  RED.nodes.registerType('drone-config', Constructor)
}
