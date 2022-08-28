import * as jspb from 'google-protobuf'

import * as google_protobuf_struct_pb from 'google-protobuf/google/protobuf/struct_pb';


export class DenseArrayProto extends jspb.Message {
  getBuffer(): Uint8Array | string;
  getBuffer_asU8(): Uint8Array;
  getBuffer_asB64(): string;
  setBuffer(value: Uint8Array | string): DenseArrayProto;

  getShapeList(): Array<number>;
  setShapeList(value: Array<number>): DenseArrayProto;
  clearShapeList(): DenseArrayProto;
  addShape(value: number, index?: number): DenseArrayProto;

  getDtype(): string;
  setDtype(value: string): DenseArrayProto;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DenseArrayProto.AsObject;
  static toObject(includeInstance: boolean, msg: DenseArrayProto): DenseArrayProto.AsObject;
  static serializeBinaryToWriter(message: DenseArrayProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DenseArrayProto;
  static deserializeBinaryFromReader(message: DenseArrayProto, reader: jspb.BinaryReader): DenseArrayProto;
}

export namespace DenseArrayProto {
  export type AsObject = {
    buffer: Uint8Array | string,
    shapeList: Array<number>,
    dtype: string,
  }
}

export class SparseArrayProto extends jspb.Message {
  getIndices(): DenseArrayProto | undefined;
  setIndices(value?: DenseArrayProto): SparseArrayProto;
  hasIndices(): boolean;
  clearIndices(): SparseArrayProto;

  getValues(): DenseArrayProto | undefined;
  setValues(value?: DenseArrayProto): SparseArrayProto;
  hasValues(): boolean;
  clearValues(): SparseArrayProto;

  getShapeList(): Array<number>;
  setShapeList(value: Array<number>): SparseArrayProto;
  clearShapeList(): SparseArrayProto;
  addShape(value: number, index?: number): SparseArrayProto;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SparseArrayProto.AsObject;
  static toObject(includeInstance: boolean, msg: SparseArrayProto): SparseArrayProto.AsObject;
  static serializeBinaryToWriter(message: SparseArrayProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SparseArrayProto;
  static deserializeBinaryFromReader(message: SparseArrayProto, reader: jspb.BinaryReader): SparseArrayProto;
}

export namespace SparseArrayProto {
  export type AsObject = {
    indices?: DenseArrayProto.AsObject,
    values?: DenseArrayProto.AsObject,
    shapeList: Array<number>,
  }
}

export class NdArrayProto extends jspb.Message {
  getDense(): DenseArrayProto | undefined;
  setDense(value?: DenseArrayProto): NdArrayProto;
  hasDense(): boolean;
  clearDense(): NdArrayProto;

  getSparse(): SparseArrayProto | undefined;
  setSparse(value?: SparseArrayProto): NdArrayProto;
  hasSparse(): boolean;
  clearSparse(): NdArrayProto;

  getClsName(): string;
  setClsName(value: string): NdArrayProto;

  getParameters(): google_protobuf_struct_pb.Struct | undefined;
  setParameters(value?: google_protobuf_struct_pb.Struct): NdArrayProto;
  hasParameters(): boolean;
  clearParameters(): NdArrayProto;

  getNdarrayCase(): NdArrayProto.NdarrayCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NdArrayProto.AsObject;
  static toObject(includeInstance: boolean, msg: NdArrayProto): NdArrayProto.AsObject;
  static serializeBinaryToWriter(message: NdArrayProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NdArrayProto;
  static deserializeBinaryFromReader(message: NdArrayProto, reader: jspb.BinaryReader): NdArrayProto;
}

export namespace NdArrayProto {
  export type AsObject = {
    dense?: DenseArrayProto.AsObject,
    sparse?: SparseArrayProto.AsObject,
    clsName: string,
    parameters?: google_protobuf_struct_pb.Struct.AsObject,
  }

  export enum NdarrayCase { 
    NDARRAY_NOT_SET = 0,
    DENSE = 1,
    SPARSE = 2,
  }
}

export class SparrayProro extends jspb.Message {
  getId(): string;
  setId(value: string): SparrayProro;

  getBuffer(): Uint8Array | string;
  getBuffer_asU8(): Uint8Array;
  getBuffer_asB64(): string;
  setBuffer(value: Uint8Array | string): SparrayProro;

  getTensor(): NdArrayProto | undefined;
  setTensor(value?: NdArrayProto): SparrayProro;
  hasTensor(): boolean;
  clearTensor(): SparrayProro;

  getText(): string;
  setText(value: string): SparrayProro;

  getEmbedding(): NdArrayProto | undefined;
  setEmbedding(value?: NdArrayProto): SparrayProro;
  hasEmbedding(): boolean;
  clearEmbedding(): SparrayProro;

  getUri(): string;
  setUri(value: string): SparrayProro;

  getMimeType(): string;
  setMimeType(value: string): SparrayProro;

  getMapMap(): jspb.Map<string, string>;
  clearMapMap(): SparrayProro;

  getMetadata(): google_protobuf_struct_pb.Struct | undefined;
  setMetadata(value?: google_protobuf_struct_pb.Struct): SparrayProro;
  hasMetadata(): boolean;
  clearMetadata(): SparrayProro;

  getDataCase(): SparrayProro.DataCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SparrayProro.AsObject;
  static toObject(includeInstance: boolean, msg: SparrayProro): SparrayProro.AsObject;
  static serializeBinaryToWriter(message: SparrayProro, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SparrayProro;
  static deserializeBinaryFromReader(message: SparrayProro, reader: jspb.BinaryReader): SparrayProro;
}

export namespace SparrayProro {
  export type AsObject = {
    id: string,
    buffer: Uint8Array | string,
    tensor?: NdArrayProto.AsObject,
    text: string,
    embedding?: NdArrayProto.AsObject,
    uri: string,
    mimeType: string,
    mapMap: Array<[string, string]>,
    metadata?: google_protobuf_struct_pb.Struct.AsObject,
  }

  export enum DataCase { 
    DATA_NOT_SET = 0,
    BUFFER = 2,
    TENSOR = 3,
    TEXT = 4,
  }
}

export class Sparray extends jspb.Message {
  getSparraysList(): Array<SparrayProro>;
  setSparraysList(value: Array<SparrayProro>): Sparray;
  clearSparraysList(): Sparray;
  addSparrays(value?: SparrayProro, index?: number): SparrayProro;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Sparray.AsObject;
  static toObject(includeInstance: boolean, msg: Sparray): Sparray.AsObject;
  static serializeBinaryToWriter(message: Sparray, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Sparray;
  static deserializeBinaryFromReader(message: Sparray, reader: jspb.BinaryReader): Sparray;
}

export namespace Sparray {
  export type AsObject = {
    sparraysList: Array<SparrayProro.AsObject>,
  }
}

export class ChatProto extends jspb.Message {
  getId(): number;
  setId(value: number): ChatProto;

  getName(): string;
  setName(value: string): ChatProto;

  getMsg(): string;
  setMsg(value: string): ChatProto;

  getBuffer(): Uint8Array | string;
  getBuffer_asU8(): Uint8Array;
  getBuffer_asB64(): string;
  setBuffer(value: Uint8Array | string): ChatProto;

  getDtype(): string;
  setDtype(value: string): ChatProto;

  getTs(): string;
  setTs(value: string): ChatProto;

  getImginfo(): Image | undefined;
  setImginfo(value?: Image): ChatProto;
  hasImginfo(): boolean;
  clearImginfo(): ChatProto;

  getMediacontrol(): MediaControl | undefined;
  setMediacontrol(value?: MediaControl): ChatProto;
  hasMediacontrol(): boolean;
  clearMediacontrol(): ChatProto;

  getBigfile(): StreamFile | undefined;
  setBigfile(value?: StreamFile): ChatProto;
  hasBigfile(): boolean;
  clearBigfile(): ChatProto;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChatProto.AsObject;
  static toObject(includeInstance: boolean, msg: ChatProto): ChatProto.AsObject;
  static serializeBinaryToWriter(message: ChatProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChatProto;
  static deserializeBinaryFromReader(message: ChatProto, reader: jspb.BinaryReader): ChatProto;
}

export namespace ChatProto {
  export type AsObject = {
    id: number,
    name: string,
    msg: string,
    buffer: Uint8Array | string,
    dtype: string,
    ts: string,
    imginfo?: Image.AsObject,
    mediacontrol?: MediaControl.AsObject,
    bigfile?: StreamFile.AsObject,
  }
}

export class StreamFile extends jspb.Message {
  getIdx(): number;
  setIdx(value: number): StreamFile;

  getTotal(): number;
  setTotal(value: number): StreamFile;

  getChunk(): Uint8Array | string;
  getChunk_asU8(): Uint8Array;
  getChunk_asB64(): string;
  setChunk(value: Uint8Array | string): StreamFile;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamFile.AsObject;
  static toObject(includeInstance: boolean, msg: StreamFile): StreamFile.AsObject;
  static serializeBinaryToWriter(message: StreamFile, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StreamFile;
  static deserializeBinaryFromReader(message: StreamFile, reader: jspb.BinaryReader): StreamFile;
}

export namespace StreamFile {
  export type AsObject = {
    idx: number,
    total: number,
    chunk: Uint8Array | string,
  }
}

export class SingleBigFile extends jspb.Message {
  getBuffer(): Uint8Array | string;
  getBuffer_asU8(): Uint8Array;
  getBuffer_asB64(): string;
  setBuffer(value: Uint8Array | string): SingleBigFile;

  getText(): string;
  setText(value: string): SingleBigFile;

  getDtype(): string;
  setDtype(value: string): SingleBigFile;

  getDataCase(): SingleBigFile.DataCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SingleBigFile.AsObject;
  static toObject(includeInstance: boolean, msg: SingleBigFile): SingleBigFile.AsObject;
  static serializeBinaryToWriter(message: SingleBigFile, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SingleBigFile;
  static deserializeBinaryFromReader(message: SingleBigFile, reader: jspb.BinaryReader): SingleBigFile;
}

export namespace SingleBigFile {
  export type AsObject = {
    buffer: Uint8Array | string,
    text: string,
    dtype: string,
  }

  export enum DataCase { 
    DATA_NOT_SET = 0,
    BUFFER = 1,
    TEXT = 2,
  }
}

export class Image extends jspb.Message {
  getWidth(): number;
  setWidth(value: number): Image;

  getHeight(): number;
  setHeight(value: number): Image;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Image.AsObject;
  static toObject(includeInstance: boolean, msg: Image): Image.AsObject;
  static serializeBinaryToWriter(message: Image, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Image;
  static deserializeBinaryFromReader(message: Image, reader: jspb.BinaryReader): Image;
}

export namespace Image {
  export type AsObject = {
    width: number,
    height: number,
  }
}

export class MediaControl extends jspb.Message {
  getPaused(): boolean;
  setPaused(value: boolean): MediaControl;

  getCurrenttime(): number;
  setCurrenttime(value: number): MediaControl;

  getBuffer(): Uint8Array | string;
  getBuffer_asU8(): Uint8Array;
  getBuffer_asB64(): string;
  setBuffer(value: Uint8Array | string): MediaControl;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MediaControl.AsObject;
  static toObject(includeInstance: boolean, msg: MediaControl): MediaControl.AsObject;
  static serializeBinaryToWriter(message: MediaControl, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MediaControl;
  static deserializeBinaryFromReader(message: MediaControl, reader: jspb.BinaryReader): MediaControl;
}

export namespace MediaControl {
  export type AsObject = {
    paused: boolean,
    currenttime: number,
    buffer: Uint8Array | string,
  }
}

export class ChatMessage extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): ChatMessage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChatMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ChatMessage): ChatMessage.AsObject;
  static serializeBinaryToWriter(message: ChatMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChatMessage;
  static deserializeBinaryFromReader(message: ChatMessage, reader: jspb.BinaryReader): ChatMessage;
}

export namespace ChatMessage {
  export type AsObject = {
    message: string,
  }
}

export class ChatResponse extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): ChatResponse;

  getReceived(): boolean;
  setReceived(value: boolean): ChatResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChatResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ChatResponse): ChatResponse.AsObject;
  static serializeBinaryToWriter(message: ChatResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChatResponse;
  static deserializeBinaryFromReader(message: ChatResponse, reader: jspb.BinaryReader): ChatResponse;
}

export namespace ChatResponse {
  export type AsObject = {
    message: string,
    received: boolean,
  }
}

export class Point extends jspb.Message {
  getLatitude(): number;
  setLatitude(value: number): Point;

  getLongitude(): number;
  setLongitude(value: number): Point;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Point.AsObject;
  static toObject(includeInstance: boolean, msg: Point): Point.AsObject;
  static serializeBinaryToWriter(message: Point, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Point;
  static deserializeBinaryFromReader(message: Point, reader: jspb.BinaryReader): Point;
}

export namespace Point {
  export type AsObject = {
    latitude: number,
    longitude: number,
  }
}

export class Rectangle extends jspb.Message {
  getLo(): Point | undefined;
  setLo(value?: Point): Rectangle;
  hasLo(): boolean;
  clearLo(): Rectangle;

  getHi(): Point | undefined;
  setHi(value?: Point): Rectangle;
  hasHi(): boolean;
  clearHi(): Rectangle;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Rectangle.AsObject;
  static toObject(includeInstance: boolean, msg: Rectangle): Rectangle.AsObject;
  static serializeBinaryToWriter(message: Rectangle, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Rectangle;
  static deserializeBinaryFromReader(message: Rectangle, reader: jspb.BinaryReader): Rectangle;
}

export namespace Rectangle {
  export type AsObject = {
    lo?: Point.AsObject,
    hi?: Point.AsObject,
  }
}

export class Feature extends jspb.Message {
  getName(): string;
  setName(value: string): Feature;

  getLocation(): Point | undefined;
  setLocation(value?: Point): Feature;
  hasLocation(): boolean;
  clearLocation(): Feature;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Feature.AsObject;
  static toObject(includeInstance: boolean, msg: Feature): Feature.AsObject;
  static serializeBinaryToWriter(message: Feature, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Feature;
  static deserializeBinaryFromReader(message: Feature, reader: jspb.BinaryReader): Feature;
}

export namespace Feature {
  export type AsObject = {
    name: string,
    location?: Point.AsObject,
  }
}

export class RouteNote extends jspb.Message {
  getLocation(): Point | undefined;
  setLocation(value?: Point): RouteNote;
  hasLocation(): boolean;
  clearLocation(): RouteNote;

  getMessage(): string;
  setMessage(value: string): RouteNote;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RouteNote.AsObject;
  static toObject(includeInstance: boolean, msg: RouteNote): RouteNote.AsObject;
  static serializeBinaryToWriter(message: RouteNote, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RouteNote;
  static deserializeBinaryFromReader(message: RouteNote, reader: jspb.BinaryReader): RouteNote;
}

export namespace RouteNote {
  export type AsObject = {
    location?: Point.AsObject,
    message: string,
  }
}

export class RouteSummary extends jspb.Message {
  getPointCount(): number;
  setPointCount(value: number): RouteSummary;

  getFeatureCount(): number;
  setFeatureCount(value: number): RouteSummary;

  getDistance(): number;
  setDistance(value: number): RouteSummary;

  getElapsedTime(): number;
  setElapsedTime(value: number): RouteSummary;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RouteSummary.AsObject;
  static toObject(includeInstance: boolean, msg: RouteSummary): RouteSummary.AsObject;
  static serializeBinaryToWriter(message: RouteSummary, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RouteSummary;
  static deserializeBinaryFromReader(message: RouteSummary, reader: jspb.BinaryReader): RouteSummary;
}

export namespace RouteSummary {
  export type AsObject = {
    pointCount: number,
    featureCount: number,
    distance: number,
    elapsedTime: number,
  }
}

