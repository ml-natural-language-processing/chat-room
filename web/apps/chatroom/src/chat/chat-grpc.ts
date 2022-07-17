import * as protobuf from 'protobufjs';
import axios from "axios";
import * as grpc from '@grpc/grpc-js';
import * as  protoLoader from '@grpc/proto-loader';


const PROTO_PATH = '../proto/sparray.proto';
let packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);
