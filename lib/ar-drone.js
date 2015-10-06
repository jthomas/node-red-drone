// We're wrapping the original ar-drone module to extend with
// a connection factory and extra methods.
var arDrone = require('ar-drone')

var location = function () {
  this.emit('location', this.current_location)
}

var status = function () {
  this.emit('status', this.current_telemetry)
}

var photo = function () {
  this.emit('photo', this.current_photo)
}

var Wrapper = function () {
  this.connections = {}

  this.clientFactory = function (ip_address) {
    if (!this.connections.hasOwnProperty(ip_address)) {
      var client = this.createClient({ip: ip_address})
      client.config('general:navdata_demo', 'FALSE'); 
      
      client.photo = photo
      client.status = status
      client.location = location
      client.current_photo = new Buffer(0)

      var pngStream = client.getPngStream()

      pngStream.on('data', function (photo) {
        client.current_photo = photo
        client.emit('pictures', photo)
      })

      client.on('navdata', function (data) {
        client.current_telemetry = data.demo
        client.emit('telemetry', data.demo)
        if (data.gps) {
          var location = {latitude: data.gps.latitude, longitude: data.gps.longitude}
          client.current_location = location
          client.emit('gps', location)
        }
      })

      this.connections[ip_address] = client
    }

    return this.connections[ip_address]
  }
}

Wrapper.prototype = arDrone
module.exports = new Wrapper()
