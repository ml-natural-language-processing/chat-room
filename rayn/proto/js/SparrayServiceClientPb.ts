/**
 * @fileoverview gRPC-Web generated client stub for sparray
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as sparray_pb from './sparray_pb';


export class SparrayClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'binary';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorGetFeature = new grpcWeb.MethodDescriptor(
    '/sparray.Sparray/GetFeature',
    grpcWeb.MethodType.UNARY,
    sparray_pb.Point,
    sparray_pb.Feature,
    (request: sparray_pb.Point) => {
      return request.serializeBinary();
    },
    sparray_pb.Feature.deserializeBinary
  );

  getFeature(
    request: sparray_pb.Point,
    metadata: grpcWeb.Metadata | null): Promise<sparray_pb.Feature>;

  getFeature(
    request: sparray_pb.Point,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: sparray_pb.Feature) => void): grpcWeb.ClientReadableStream<sparray_pb.Feature>;

  getFeature(
    request: sparray_pb.Point,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: sparray_pb.Feature) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/sparray.Sparray/GetFeature',
        request,
        metadata || {},
        this.methodDescriptorGetFeature,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/sparray.Sparray/GetFeature',
    request,
    metadata || {},
    this.methodDescriptorGetFeature);
  }

  methodDescriptorListFeatures = new grpcWeb.MethodDescriptor(
    '/sparray.Sparray/ListFeatures',
    grpcWeb.MethodType.SERVER_STREAMING,
    sparray_pb.Rectangle,
    sparray_pb.Feature,
    (request: sparray_pb.Rectangle) => {
      return request.serializeBinary();
    },
    sparray_pb.Feature.deserializeBinary
  );

  listFeatures(
    request: sparray_pb.Rectangle,
    metadata?: grpcWeb.Metadata): grpcWeb.ClientReadableStream<sparray_pb.Feature> {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/sparray.Sparray/ListFeatures',
      request,
      metadata || {},
      this.methodDescriptorListFeatures);
  }

}

