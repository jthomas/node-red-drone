module.exports = function (RED) {
  function Constructor (config) {
    RED.nodes.createNode(this, config)
    var node = this

    console.log(config)

    var ip_address = RED.nodes.getNode(config.ip_address);
    console.log(ip_address)
    this.on('input', function (msg) {
      console.log(msg.payload)
    })
  }

  RED.nodes.registerType('drone-commands', Constructor)
}
