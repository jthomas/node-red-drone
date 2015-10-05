module.exports = function (RED) {
  function Constructor (config) {
    RED.nodes.createNode(this, config)
    var node = this

    var ip_address = RED.nodes.getNode(config.ip_address)
    var client = ip_address.connection.client

    this.on('input', function (msg) {
      if (typeof client[msg.payload] !== 'function') {
        node.error('Unknown drone command. Please see the documentation for valid commands.')
        return
      }

      // argument can a single value or array of parameters
      var options = Array.isArray(msg.command_options) 
        ? msg.command_options : [msg.command_options]

      client[msg.payload].apply(client, options)
    })
  }

  RED.nodes.registerType('drone-commands', Constructor)
}
