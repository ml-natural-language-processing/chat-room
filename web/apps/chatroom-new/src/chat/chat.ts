import * as protobuf from 'protobufjs';
import axios from "axios";
import {
    download, saveArrayBuffer, saveString,
    read_imgs, read_img_simgle, read_data, read_single_data,
    arraybuffer2base64, concatenate
} from "./utils";
import {getCookie} from "../utils";
import {UserConfig} from "../config_gen";
import {Status} from "./state";
import {SparrayServiceClient} from '../proto/module/SparrayServiceClientPb'
import * as pb2 from '../proto/module/sparray_pb'


const websocket_dir = UserConfig.websocketDir;
const grpcHostname = 'http://' + UserConfig.grpcDir;
const grpcClient = new SparrayServiceClient(grpcHostname);
const grpcChat = new pb2.ChatProto();

let socket: WebSocket;
let showMessage = true;
let percent_message_content = document.createElement('span');
const sendButton = document.getElementById('btn') as HTMLElement
const uploadElement = document.getElementById('sendFile') as HTMLInputElement;
const uploadSliceElement = document.getElementById('sendSliceFile') as HTMLInputElement;

const context = document.getElementById('context') as any;
let contextUserName: string;
// = document.getElementById('uName') as any;
let ChatProto: any;
let chat_buffer: any;
let imageWidth: number = 0;
let imageHeight: number = 0;
let new_message: any;
let media_element: any;

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

                const media_event_send = (event: any) => {

                    const payload = {
                        'msg': "MediaControl",
                        'name': contextUserName,
                        'dtype': "protoMediaControl",
                        'imgInfo': {'width': imageWidth, 'height': imageHeight},
                        'mediaControl': {
                            'currentTime': media_element.currentTime,
                            'paused': media_element.paused,
                        },
                    };
                    const errMsg = ChatProto.verify(payload);
                    if (errMsg) {
                        throw Error(errMsg);
                    }
                    let mediaControlMessage = ChatProto.create(payload);
                    const controlBuffer = ChatProto.encode(mediaControlMessage).finish();
                    socket.send(controlBuffer);
                }

                socket.onmessage = async (event: MessageEvent) => {

                    let chatRoom = document.getElementById('chatRoom')
                    let message = document.createElement('li');

                    const parseData = (data: any) => {
                        let arraybuffer = new Uint8Array(data);
                        return ChatProto.decode(arraybuffer);
                    }
                    new_message = parseData(event.data);

                    if (new_message.bigFile !== null) {
                        Status.file.bigFileMap[new_message.bigFile.idx] = new_message.bigFile.chunk;
                        if (Status.file.chunkFileCounts == 0){
                            chatRoom!.appendChild(percent_message_content);
                        }
                        Status.file.chunkFileCounts += 1;
                        const percentNum = Status.file.chunkFileCounts/new_message.bigFile.total * 100;
                        percent_message_content.innerHTML = `Downloading... ${percentNum.toFixed(2)} %`;
                        showMessage = false;
                        if (Status.file.chunkFileCounts == new_message.bigFile.total) {
                            Status.file.chunkFileCounts = 0;
                            let totalBuffer = new Uint8Array();
                            for (let idx = 0; idx < new_message.bigFile.total; idx++) {
                                totalBuffer = concatenate(Uint8Array, totalBuffer, Status.file.bigFileMap[idx]);
                            }
                            new_message.buffer = totalBuffer;
                            Status.file.bigFileMap = {};
                            showMessage = true;
                        }
                    }


                    const add_media_element = (media_type: string) => {
                        const blob = new Blob([new_message.buffer], {type: new_message.dtype})
                        media_element = document.createElement(media_type);
                        media_element.src = URL.createObjectURL(blob);
                        // media_element = new Audio(URL.createObjectURL(blob))
                        // media_element.setAttribute('type', new_message.dtype);
                        console.log(new_message.dtype);
                        // media_element.setAttribute('controls', 'true');
                        media_element.controls = 'true'
                        message.appendChild(media_element);
                        chatRoom!.appendChild(message);
                        chatRoom!.scrollTop = chatRoom!.scrollHeight;
                        // media_element.ontimeupdate = media_ele_ontimeupdate;
                        media_element.onplay = media_event_send;
                        media_element.onpause = media_event_send;
                        // media_element.play();
                    }

                    let message_content: any;

                    // console.log("接收到protobuf：\n", new_message);
                    // chatRoom!.innerHTML += `<div>${new_message.name}: ${new_message.msg} </div>`;
                    if (new_message.dtype !== "protoMediaControl") {
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
                        } else if (new_message.dtype.startsWith("video")) {
                            add_media_element('video')
                        } else if (new_message.dtype.startsWith('audio')) {
                            add_media_element('audio')
                        }

                        addDownloadButton(message_content, new_message)

                    }
                    if (new_message.name !== contextUserName &&
                        new_message.dtype === "protoMediaControl"
                    ) {
                        // console.log(contextUserName);
                        // console.log(new_message);
                        // media_element.ontimeupdate = null;
                        media_element.onplay = null;
                        media_element.onpause = null;
                        media_element.currentTime = new_message.mediaControl.currentTime;
                        if (new_message.mediaControl.paused) {
                            media_element.pause();
                        } else {
                            media_element.play();
                        }
                        // media_element.ontimeupdate = media_event_send;
                        media_element.onplay = media_event_send;
                        media_element.onpause = media_event_send;
                    } else {
                        if (showMessage && typeof message_content !== 'undefined') {
                            message.appendChild(message_content);
                            chatRoom!.appendChild(message);
                            chatRoom!.scrollTop = chatRoom!.scrollHeight;
                        }
                    }
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

function sendMessage(payload: any) {
    let errMsg = ChatProto.verify(payload);
    if (errMsg) {
        throw Error(errMsg);
    }
    const message = ChatProto.create(payload);
    const buffer = ChatProto.encode(message).finish();
    socket.send(buffer);
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
    // imageHeight = 0;
    // imageWidth = 0;
    sendGrpcMessage(payload);
    sendMessage(payload);
}

uploadSliceElement.onchange = async () => {
    // const dataResList: any = await read_data(uploadSliceElement.files!);
    // let bigFileSocket = new WebSocket(`ws://${websocket_dir}/tests/ws?token=${contextUserName}`);
    // bigFileSocket.binaryType = 'arraybuffer'
    read_data(uploadSliceElement.files!).then(dataResList =>{
        // TODO
        const dataRes = dataResList[0];
        uploadBigFile(dataRes, socket).then();
    });
}

sendButton.onclick = function () {
    const new_message = ChatProto.decode(chat_buffer);
    new_message.msg = context.value;
    new_message.name = contextUserName;
    context.value = "";
    chat_buffer = ChatProto.encode(new_message).finish();
    socket.send(chat_buffer);
}


context.addEventListener("keydown", function (e: any) {
    const keyCode = e.which || e.keyCode;
    if (keyCode === 13 && e.shiftKey) {
        sendButton.click();
    }
});


function sendGrpcMessage(payload: any){
    grpcChat.setId(payload.id);
    grpcChat.setName(payload.name);
    grpcChat.setMsg(payload.msg);
    grpcChat.setDtype(payload.dtype);
    grpcChat.setBuffer(payload.buffer);
    const imageInfo =new pb2.Image();
    imageInfo.setWidth(imageWidth);
    imageInfo.setHeight(imageHeight);
    grpcChat.setImginfo(imageInfo);
    grpcClient.identityMapping(grpcChat, {}, (err, response)=>{
        if (err){
            console.log(err);
        }else{
            console.log("in grpc response");
            console.log(response);
        }
    })
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


async function uploadBigFile(dataRes: any, socket: WebSocket) {
    if (dataRes['dtype'].startsWith("image")) {
        const imgInfoList = await read_imgs(uploadSliceElement.files!);
        const imgInfo: any = imgInfoList[0];
        imageWidth = imgInfo['width'];
        imageHeight = imgInfo['height'];
    }

    const buffer = new Uint8Array(dataRes['buffer'])

    const totalSize = buffer.length;
    const chunkSize = 1024 * 1024;
    const totalChunks = Math.ceil(totalSize / chunkSize);
    // const spark = new SparkMD5.ArrayBuffer();
    let endIdx: number;
    let currentChunk: number;

    let chatRoom = document.getElementById('chatRoom')

    let uploadPercentSpan = document.createElement('span');
    let message = document.createElement('li');
    message.appendChild(uploadPercentSpan);
    chatRoom!.appendChild(message);

    for (currentChunk = 0; currentChunk < totalChunks; currentChunk++) {
        const percentNum = (currentChunk+1)/totalChunks * 100;
        uploadPercentSpan.innerHTML = `Uploading...${percentNum.toFixed(2)} %`;
        endIdx = chunkSize * (currentChunk + 1);
        if (endIdx >= totalSize) {
            endIdx = totalSize;
        }
        const chunk = buffer.slice(chunkSize * currentChunk, endIdx);
        // spark.append(chunk);
        const chunkPayload = {
            'msg': dataRes['msg'],
            'name': dataRes['name'],
            'dtype': dataRes['dtype'],
            'imgInfo': {'width': imageWidth, 'height': imageHeight},
            'bigFile': {
                'idx': currentChunk,
                'total': totalChunks,
                'chunk': chunk,
            }
        }

        const errMsg = ChatProto.verify(chunkPayload);
        if (errMsg) {
            throw Error(errMsg);
        }
        const chunkmessage = ChatProto.create(chunkPayload);
            socket.send(ChatProto.encode(chunkmessage).finish());
    }
}