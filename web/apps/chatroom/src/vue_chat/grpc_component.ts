import {UserConfig} from '../config_gen'
import {SparrayServiceClient} from '../proto/module/SparrayServiceClientPb'
// import * as pb2 from '../proto/module/sparray_pb'
import {ChatMessage, ChatProto} from "../proto/module/sparray_pb";

const hostname = 'http://' + UserConfig.grpcDir;
console.log(hostname)
const client = new SparrayServiceClient(hostname);
const chat = new ChatProto();

export function setChatAttr(id: number, name: string, msg: string) {
    chat.setId(id)
    chat.setName(name)
    chat.setMsg(msg)
}

export async function getGrpcResponse() {
    return new Promise((resolve, reject) => {
        client.identityMapping(chat, {}, (err, response) => {
            if (err) {
                console.log(err);
            } else {
                resolve({
                    "id": response.getId(),
                    "name": response.getName(),
                    "msg": response.getMsg()
                })
            }
        })
    })
}


// const request = new ChatMessage()
// request.setMessage("hellow");
// client.getChat(request, {}, function (err, response) {
//     if (err) {
//         console.log(err);
//         return
//     } else {
//         console.log("aaaaaaaaaa")
//         console.log(response);
//     }
//     // ...
// });


