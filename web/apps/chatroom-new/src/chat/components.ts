import {
    download, saveArrayBuffer, saveString,
    read_imgs, read_img_simgle, read_data, read_single_data,
    arraybuffer2base64, concatenate
} from "./utils";
import {getCookie} from "../utils";
import {UserConfig} from "../config_gen";
import {Status} from "./state";


let media_element: any;
export let socket: WebSocket;

export function init(root: any){
    Status.chat.proto = root.lookupType("sparray.ChatProto");
    Status.user.contextName = getCookie('username');
    if (Status.user.contextName == '') {
        alert("身份已过期,请重新登录");
        window.location.href = "/";
    } else 
        {
        let payload = {
            "name": "官方广播",
            "msg": `欢迎 ${Status.user.contextName} 加入聊天`
        };
        const errMsg = Status.chat.proto.verify(payload);
        if (errMsg) {
            throw Error(errMsg);
        }
        let message = Status.chat.proto.create(payload);
        Status.chat.buffer = Status.chat.proto.encode(message).finish();
        // const user_id = userStatus.get("username");
        // console.log(userStatus);
        const user_id = "placeholder";
        socket = new WebSocket(`ws://${UserConfig.websocketDir}/chat/${user_id}/ws?token=${Status.user.contextName}`);
        socket.binaryType = 'arraybuffer'
        socket.onopen = (e: Event) => {
        socket.send(Status.chat.buffer);
        };
    }
}



export const media_event_send = (event: any) => {

    const payload = {
        'msg': "MediaControl",
        'name': Status.user.contextName,
        'dtype': "protoMediaControl",
        'imgInfo': {'width': Status.image.width, 'height': Status.image.height},
        'mediaControl': {
            'currentTime': Status.media.element.currentTime,
            'paused': Status.media.element.paused,
        },
    };
    const errMsg = Status.chat.proto.verify(payload);
    if (errMsg) {
        throw Error(errMsg);
    }
    let mediaControlMessage = Status.chat.proto.create(payload);
    const controlBuffer = Status.chat.proto.encode(mediaControlMessage).finish();
    socket.send(controlBuffer);
}