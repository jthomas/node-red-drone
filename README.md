# Parrot AR.Drone Node for Node-RED

This node lets you control the [Parrot AR.Drone](http://ardrone2.parrot.com/) from [Node-RED](http://nodered.org/). It provides a wrapper around the [existing Node.js library](https://github.com/felixge/node-ar-drone).

## Installation 

Install with [npm](http://npmjs.org/).

<pre>
npm install node-red-drone
</pre>

## Usage 

This module provides both input and output nodes for the drone. 

The output node will execute the string received on msg.payload as the function call on the [client API](https://github.com/felixge/node-ar-drone#client-api), e.g. *takeoff*, *land*, *up*, *down*. Command parameters can be sent on the *msg.command_options* field, either as a single value or an array. This node also supports these additional commands. 

* *photo* - take a picture using drone camera (returned as a Buffer).
* *location* - current GPS coordatinates. 
* *status* - telemetry data from drone.

The input node publishes data that comes back from the drone. All [existing client events](https://github.com/felixge/node-ar-drone#events), data streams for *pictures*, *telemetry* and *gps* are published, along with command responses for *photo*, *location* and *status*. Event name is set on *msg.payload* and *msg.data* contains the response. This node can be configured to ignore and delay event messages using the editor panel.
