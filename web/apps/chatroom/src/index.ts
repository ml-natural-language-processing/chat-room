import * as protobuf from 'protobufjs';
import axios from "axios";


let websocket_dir: string;
if (1) {
    websocket_dir = "ws://0.0.0.0:8080/ws_chat"
} else {
    websocket_dir = "ws://192.168.61.230:51221/ws_chat"
}
let socket = new WebSocket(websocket_dir);
socket.binaryType = 'arraybuffer'

const sendButton = document.getElementById('btn') as HTMLElement

const uploadClipElement = document.getElementById('sendFile') as HTMLInputElement;
const downloadElement = document.getElementById("download-file") as HTMLInputElement;

const context = document.getElementById('context') as any;
const contextUserName = document.getElementById('uName') as any;
let ChatProto: any;
let hello_buffer: any;
let imageWidth: number = 0;
let imageHeight: number = 0;
let new_message: any;


start()

$.when($.ready).then(() => {
    $("#user-form").on("submit", (e) => {
        e.preventDefault();
        const currentUser = $("#user_input").val();
        if (currentUser) {
            const data = {"username": currentUser};
            axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
            try {
                axios.post("http://0.0.0.0:8080/api/register", data,);
            } catch (error) {
                console.error(error);
            }
        }
    });
});


function start() {
    // const date = new Date();
    protobuf.load('./proto/sparray.proto').then((root: any) => {
            ChatProto = root.lookupType("sparray.ChatProto");
            let payload = {
                "name": "k.y",
                "msg": "Hello, Welcome to my chat room "
            };
            const errMsg = ChatProto.verify(payload);
            if (errMsg) {
                throw Error(errMsg);
            }
            let message = ChatProto.create(payload);
            // console.log(message);
            hello_buffer = ChatProto.encode(message).finish();
            socket.onopen = (e: Event) => {
                socket.send(hello_buffer);
            };
        },
        (err) => {
            throw err;
        }
    )
}


uploadClipElement.onchange = async () => {
    const dataResList: any = await read_data(uploadClipElement.files!);
    // TODO
    const dataRes = dataResList[0];
    if (dataRes['dtype'].startsWith("image")) {
        const imgInfoList = await read_imgs(uploadClipElement.files!);
        const imgInfo: any = imgInfoList[0];
        imageWidth = imgInfo['width'];
        imageHeight = imgInfo['height'];

    }
    const payload = {
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
    const new_message = ChatProto.decode(hello_buffer);
    new_message.msg = context.value;
    new_message.name = contextUserName.value;
    hello_buffer = ChatProto.encode(new_message).finish();
    socket.send(hello_buffer);
}

socket.onmessage = async (event: MessageEvent) => {

    let chatRoom = document.getElementById('chatRoom')
    let message = document.createElement('li');
    let arraybuffer = new Uint8Array(event.data);
    new_message = ChatProto.decode(arraybuffer);

    let message_content: any;
    // console.log("接收到从python发来的数据：\n", new_message);
    // chatRoom!.innerHTML += `<div>${new_message.name}: ${new_message.msg} </div>`;
    if (true) {
        message_content = document.createElement('span');
        message_content.appendChild(document.createTextNode(`${new_message.name}: ${new_message.msg}`));
        message_content.setAttribute('class', 'comment');
    }


    if (new_message.buffer.length !== 0) {
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


async function read_imgs(files: FileList) {

    let image_info_list = [];
    for (let i = 0; i < files!.length; ++i) {
        const img_info = await read_img_simgle(files[i]);
        image_info_list.push(img_info);
    }
    return image_info_list;

}

async function read_img_simgle(file: File) {

    return new Promise((resolve, reject) => {
        const imgFileReader = new FileReader();
        imgFileReader.readAsDataURL(file!);
        let image = new Image() as any;
        imgFileReader.onload = (evt) => {
            image.onload = () => {
                resolve({'width': image.width, 'height': image.height});
            };
            image.src = evt.target!.result;
        }
    })
}

async function read_single_data(file: File) {
    return new Promise((resolve, reject) => {

        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = async (evt: { target: any }) => {
            resolve({
                "msg": "file",
                "buffer": evt.target!.result,
                "dtype": file.type,
                "name": file.name
            });
        }
    })

}

async function read_data(files: FileList) {
    let message_list: any = [];
    for (let i = 0; i < files!.length; i++) {
        let item = files!.item(i)!;
        await read_single_data(item).then(res => {
            message_list.push(res);
        });
    }
    return message_list;
}

function arraybuffer2base64(arraybuffer: Uint8Array) {
    let binary = '';
    // let bytes = new Uint8Array(arraybuffer);
    let bytes = arraybuffer;
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

async function chunkedUpload(file: File, chunkSize: number, url: string) {
    for (let start = 0; start < file.size; start += chunkSize) {
        const chunk = file.slice(start, start + chunkSize + 1)
        const fd = new FormData()
        fd.append('data', chunk)
        await fetch(url, {method: 'post', body: fd}).then(
            (res) => res.text()).then(
            res => {
                console.log(res)
            })
    }
}

downloadElement.onclick = ()=>{
    download(new_message.name, new_message.buffer, new_message.dtype);
}
// const file = new File(['a'.repeat(1000000)], 'test.txt')
// const chunkSize = 40000
// const url = 'https://httpbin.org/post'
// chunkedUpload(file, chunkSize, url)

/**
 *
 * @param filename
 * @param data object data
 * @param type string
 */
function download(filename: string, data: any, type: string) {
    const blob = new Blob([data], {type});
    const objUrl = URL.createObjectURL(blob);
    const element = document.createElement('a');
    element.setAttribute('href', objUrl);
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function saveArrayBuffer(buffer: any, filename: string) {
    download(filename, buffer, 'application/octet-stream');
}

function saveString(text: string, filename: string) {
    download(filename, text, 'text/plain');
}