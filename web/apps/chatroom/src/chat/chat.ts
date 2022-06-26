import * as protobuf from 'protobufjs';
import axios from "axios";
import {
    download, saveArrayBuffer, saveString,
    read_imgs, read_img_simgle, read_data, read_single_data,
    arraybuffer2base64
} from "./utils";
import {getCookie} from "../utils";


let websocket_dir: string;
if (1) {
    websocket_dir = "0.0.0.0:8081"
} else {
    websocket_dir = "192.168.61.230:51221"
}

let socket: any

const sendButton = document.getElementById('btn') as HTMLElement
const uploadElement = document.getElementById('sendFile') as HTMLInputElement;

const context = document.getElementById('context') as any;
let contextUserName: string;
// = document.getElementById('uName') as any;
let ChatProto: any;
let chat_buffer: any;
let imageWidth: number = 0;
let imageHeight: number = 0;
let new_message: any;

start()


function start() {
    protobuf.load('../proto/sparray.proto').then((root: any) => {
            ChatProto = root.lookupType("sparray.ChatProto");
            contextUserName = getCookie('username');
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
                chat_buffer = ChatProto.encode(message).finish();
                // const user_id = userStatus.get("username");
                // console.log(userStatus);
                const user_id = "placeholder";
                socket = new WebSocket(`ws://${websocket_dir}/chat/${user_id}/ws?token=${contextUserName}`);
                socket.binaryType = 'arraybuffer'

                socket.onopen = (e: Event) => {
                    socket.send(chat_buffer);
                };

                socket.onmessage = async (event: MessageEvent) => {

                    let chatRoom = document.getElementById('chatRoom')
                    let message = document.createElement('li');

                    const parseData = (data: any) => {
                        let arraybuffer = new Uint8Array(data);
                        return ChatProto.decode(arraybuffer);
                    }
                    new_message = parseData(event.data);

                    let message_content: any;
                    console.log("接收到protobuf：\n", new_message);
                    // chatRoom!.innerHTML += `<div>${new_message.name}: ${new_message.msg} </div>`;
                    if (1) {
                        message_content = document.createElement('span');
                        const name_text_node = document.createTextNode(new_message.name + ": ");
                        const msg_text_node = document.createTextNode(new_message.msg);

                        message_content.appendChild(name_text_node);
                        message_content.appendChild(msg_text_node);
                        message_content.setAttribute('class', 'comment');
                    }


                    if (new_message.buffer.length !== 0) {

                        function addDownloadButton(message_content: any, new_message: any) {
                            let downloadButton = document.createElement("button") as HTMLInputElement;
                            const textNode = document.createTextNode("Download");
                            downloadButton.appendChild(textNode);
                            message_content.appendChild(downloadButton);
                            downloadButton.onclick = () => {
                                download(new_message.name, new_message.buffer, new_message.dtype);
                            }
                        }

                        if (new_message.dtype.startsWith("image")) {
                            const url = arraybuffer2base64(new_message.buffer);
                            let image = new Image();
                            image.src = 'data:image/png;base64,' + url;
                            const imgInfo = new_message.imgInfo
                            if (imgInfo.width / imgInfo.height > 1) {
                                image.width = 300;
                            } else {
                                image.height = 300;
                            }
                            message_content = document.createElement('span');
                            message_content.appendChild(image);
                        }
                        if (new_message.dtype.startsWith("video")) {
                            const blob = new Blob([new_message.buffer])
                            message_content = document.createElement('video');
                            message_content.src = URL.createObjectURL(blob);
                            message_content.setAttribute('type', new_message.dtype);
                            message_content.setAttribute('controls', 'true');
                        }

                        addDownloadButton(message_content, new_message)

                    }
                    message.appendChild(message_content);
                    chatRoom!.appendChild(message);
                    chatRoom!.scrollTop = chatRoom!.scrollHeight;

                };

                socket.onclose = function (event: CloseEvent) {
                    if (event.wasClean) {
                        alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
                    } else {
                        alert('[close] Connection died');
                    }
                };

                socket.onerror = function (error: any) {
                    alert(`[error] ${error.message}`);
                };
            }
        },
        (err) => {
            throw err;
        }
    )
}


uploadElement.onchange = async () => {
    const dataResList: any = await read_data(uploadElement.files!);
    // TODO
    const dataRes = dataResList[0];
    if (dataRes['dtype'].startsWith("image")) {
        const imgInfoList = await read_imgs(uploadElement.files!);
        const imgInfo: any = imgInfoList[0];
        imageWidth = imgInfo['width'];
        imageHeight = imgInfo['height'];

    }
    const payload = {
        'id': 0,
        'msg': dataRes['msg'],
        'buffer': new Uint8Array(dataRes['buffer']),
        'name': dataRes['name'],
        'dtype': dataRes['dtype'],
        'imgInfo': {'width': imageWidth, 'height': imageHeight}
    };
    imageHeight = 0;
    imageWidth = 0;
    let errMsg = ChatProto.verify(payload);
    if (errMsg) {
        throw Error(errMsg);
    }
    const message = ChatProto.create(payload);
    console.log(message);
    const buffer = ChatProto.encode(message).finish();
    socket.send(buffer);

}

sendButton.onclick = function () {
    const new_message = ChatProto.decode(chat_buffer);
    new_message.msg = context.value;
    new_message.name = contextUserName;
    context.value = "";
    chat_buffer = ChatProto.encode(new_message).finish();
    socket.send(chat_buffer);
}


// async function chunkedUpload(file: File, chunkSize: number, url: string) {
//     for (let start = 0; start < file.size; start += chunkSize) {
//         const chunk = file.slice(start, start + chunkSize + 1)
//         const fd = new FormData()
//         fd.append('data', chunk)
//         await fetch(url, {method: 'post', body: fd}).then(
//             (res) => res.text()).then(
//             res => {
//                 console.log(res)
//             });
//     }
// }

// const file = new File(['a'.repeat(1000000)], 'test.txt')
// const chunkSize = 40000
// const url = 'https://httpbin.org/post'
// chunkedUpload(file, chunkSize, url)

/**
 *
 * @param file File
 * @param Size unit: Mb
 */
function createFileChunk(file: File, Size: number) {
    const size = Size * 1024 * 1024; // 切片大小
    const fileChunkList = [];
    let cur = 0;
    while (cur < file.size) {
        fileChunkList.push({file: file.slice(cur, cur + size)});
        cur += size;
    }
    return fileChunkList
}

function calcHash(fileChunkList: Blob[]) {
}
