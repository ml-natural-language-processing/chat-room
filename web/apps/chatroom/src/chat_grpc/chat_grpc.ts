import {UserConfig} from '../config_gen'
import {SparrayServiceClient} from '../proto/module/SparrayServiceClientPb'
import * as pb2 from '../proto/module/sparray_pb'

//tutorial https://github.com/grpc/grpc/blob/v1.46.3/examples/node/dynamic_codegen/route_guide/route_guide_client.js
// grpc-web https://grpc.io/blog/grpc-web-ga/

const hostname = 'http://' + UserConfig.grpcDir;
console.log(hostname)
const client = new SparrayServiceClient(hostname);
const request = new pb2.ChatMessage()
request.setMessage("hellow");

const chat = new pb2.ChatProto();
chat.setId(1);
chat.setName('ky')
chat.setMsg("你好鸭")
let answers: any;
client.identityMapping(chat, {},  (err, response)=>{
    if (err){
        console.log(err);
    }else {
        answers = response;
        console.log(answers);
    }
})

if (typeof(answers) == "undefined"){
    console.log("bbb")

    console.log(answers);
}

client.getChat(request, {}, function(err, response) {
    if (err){
        console.log(err);
    }else {
        console.log("aaaaaaaaaa")
        console.log(response);
    }
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
