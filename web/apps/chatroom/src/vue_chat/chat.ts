import * as protobuf from 'protobufjs';
import {getCookie} from "../utils";
import {UserConfig} from "../config_gen";
import {getGrpcResponse, setChatAttr} from "./grpc_component";
const websocket_dir = UserConfig.websocketDir;

let contextUserName: string;
let new_message: any;


async function getChatProto() {
    return new Promise((resolve,) => {
        protobuf.load('../proto/sparray.proto').then((root: any) => {
            resolve(root.lookupType("sparray.ChatProto"))
        })
    })
}

const ChatProto: any = await getChatProto();

export class ChatManager {
    socket: WebSocket | any;
    contextUserName: string;
    chatBuffer: any;
    decodeChatBuffer: any;
    messageList: any[] = [];
    state: any[] = [];

    constructor() {
        this.contextUserName = getCookie('username');
        this.buildWebSocket();
    }
    buildWebSocket(){
        const user_id = "placeholder";
        contextUserName = this.contextUserName;
        this.socket = new WebSocket(`ws://${websocket_dir}/chat/${user_id}/ws?token=${contextUserName}`);
        this.socket.binaryType = 'arraybuffer';
        if (contextUserName == '') {
            alert("身份已过期,请重新登录");
            window.location.href = "/";
        } else {
            let payload = {
                "name": "官方广播",
                "msg": `欢迎 ${contextUserName} 加入聊天`
            };
            const errMsg = ChatProto.verify(payload);
            if (errMsg) {
                throw Error(errMsg);
            }
            let message = ChatProto.create(payload);
            this.chatBuffer = ChatProto.encode(message).finish();
            this.decodeChatBuffer = ChatProto.decode(this.chatBuffer);
            this.decodeChatBuffer.name = contextUserName;
        }
    }

    async grpcSemdMsg(msg: string){
        setChatAttr(1, 'a', msg)
        const resp = await getGrpcResponse()
        console.log(resp)
    }

    socketSendMsg(msg: string) {
        this.decodeChatBuffer.msg = msg;
        this.chatBuffer = ChatProto.encode(this.decodeChatBuffer).finish();
        this.socket.send(this.chatBuffer);
    }
    registerState(state: any){
        this.state = state;
    }

    addSocketEvent() {
        this.socket.onopen = (e: Event) => {
            this.socket.send(this.chatBuffer);
        };
        this.socket.onmessage = (event: MessageEvent) => {
            const parseData = (data: any) => {
                let arraybuffer = new Uint8Array(data);
                return ChatProto.decode(arraybuffer);
            }
            new_message = parseData(event.data);
            const new_msg = `${new_message.name}:  \n${new_message.msg} `;
            console.log(new_msg);
            this.state.push(new_msg);
        }

        this.socket.onclose = function (event: CloseEvent) {
            if (event.wasClean) {
                alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
            } else {
                alert('[close] Connection died');
            }
        };

        this.socket.onerror = function (error: any) {
            alert(`[error] ${error.message}`);
        };
    }

}
