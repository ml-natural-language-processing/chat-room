// import * as zmq from '@types/zeromq';
// import * as zmq from 'zeromq';
// const zmq = require("zeromq")
// import * as protobuf from 'protobufjs';
import {SparrayClient} from '../proto/module/SparrayServiceClientPb'
import * as pb2 from '../proto/module/sparray_pb'
// import {CodeGeneratorResponse} from "google-protobuf/google/protobuf/compiler/plugin_pb";
// import Feature = CodeGeneratorResponse.Feature;


//tutorial https://github.com/grpc/grpc/blob/v1.46.3/examples/node/dynamic_codegen/route_guide/route_guide_client.js
// grpc-web https://grpc.io/blog/grpc-web-ga/
// grpc-web 才是可以运行在浏览器上的

const client = new SparrayClient("http://0.0.0.0:50051");
const request = new pb2.Feature()

console.log("emmmmmmmmmmmmmmmmmmmmmmm")
request.setName("emmmm")

// const point2 = {
//     latitude: 0,
//     longitude: 0
// };

const point2 = new pb2.Point()
point2.setLatitude(20);
point2.setLongitude(234);
request.setLocation(point2)

console.log('aaaaaaaaaaaaaaaa')
client.getFeature(point2, {}, function(err, response) {
    // ...
});





//////////////////////////////////////////////////////
// async function run() {
//         const sock = new zmq.Pull
//
//         console.log("Worker connected to port 3000")
//         sock.connect("tcp://127.0.0.1:51221")
//
//         for await (const [msg] of sock) {
//                 console.log("work: %s", msg.toString())
//         }
// }

// run()