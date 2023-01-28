import {SparrayServiceClient} from '../proto/module/SparrayServiceClientPb';
import * as pb2 from '../proto/module/sparray_pb';
import {UserConfig} from "../config_gen";


export let Status: any = {
    "file": {
        "bigFileMap": {} as any,
        "chunkFileCounts": 0,
    },
    "image": {
        "width": 0,
        "height": 0,
    },
    "media": {
        "control": null as any,
        "element": null as any,
    },
    // "grpc":{
    //     'client': new SparrayServiceClient('http://' + UserConfig.grpcDir),
    //     'chat': new pb2.ChatProto(),
    // },
    "chat":{
        'buffer': null as any,
        "proto": null as any,
    },
    "user": {
        "contextName": null as any,
    },
    "new_message": null as any,
}
