export async function read_imgs(files: FileList) {

    let image_info_list = [];
    for (let i = 0; i < files!.length; ++i) {
        const img_info = await read_img_simgle(files[i]);
        image_info_list.push(img_info);
    }
    return image_info_list;

}

export async function read_img_simgle(file: File) {

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

export async function read_single_data(file: File) {
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

export async function read_data(files: FileList) {
    let message_list: any = [];
    for (let i = 0; i < files!.length; i++) {
        let item = files!.item(i)!;
        await read_single_data(item).then(res => {
            message_list.push(res);
        });
    }
    return message_list;
}

export function arraybuffer2base64(arraybuffer: Uint8Array) {
    let binary = '';
    // let bytes = new Uint8Array(arraybuffer);
    let bytes = arraybuffer;
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

/**
 *
 * @param filename
 * @param data object data
 * @param type string
 */
export function download(filename: string, data: any, type: string) {
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

export function saveArrayBuffer(buffer: any, filename: string) {
    download(filename, buffer, 'application/octet-stream');
}

export function saveString(text: string, filename: string) {
    download(filename, text, 'text/plain');
}

export function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
