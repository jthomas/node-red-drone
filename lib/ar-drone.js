// Check for valid commands, simple
// Add complex commands
// Add stop.
//
// picture repeat: "stop", ms.
// state & repeat: "", "", "", "".

// We're wrapping the original ar-drone module to extend with
// a connection factory and extra methods.
var arDrone = require('ar-drone')

var info = function (repeat, previous_info) {
}

var photo = function (repeat, previous_photo) {
  var current = this.current_photo,
    should_repeat = (typeof repeat !== 'undefined')

  // Any sleeping timers must be destroyed before setting
  // up the next one.
  if (should_repeat) {
    clearTimeout(this.photo._timeout)

    if (repeat === 'stop') return
  }

  // Emit photos that have changed since the last call, if previous
  // photo argument is included.
  if (current.compare(previous_photo || new Buffer(0)) !== 0) {
    this.emit('photo', current)
  }

  var cb = this.photo.bind(this, repeat, current)
  this.photo._timeout = (should_repeat ? setTimeout(cb, repeat) : null)
}

var wrapper = function () {
  this.connections = {},

  this.clientFactory = function (ip_address) {
    if (!this.connections.hasOwnProperty(ip_address)) {
      var client = this.createClient({ip: ip_address})
      client.photo = photo
      client.info = info 
      client.current_photo = new Buffer(0)

      var pngStream = client.getPngStream()
      pngStream.on('data', function (photo) {
        client.current_photo = photo
      });

      this.connections[ip_address] = client
    }

    return this.connections[ip_address]
  }
}

wrapper.prototype = arDrone
module.exports = new wrapper()
