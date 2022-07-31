import * as jspb from 'google-protobuf'

import * as google_protobuf_struct_pb from 'google-protobuf/google/protobuf/struct_pb';


export class DenseNdArrayProto extends jspb.Message {
  getBuffer(): Uint8Array | string;
  getBuffer_asU8(): Uint8Array;
  getBuffer_asB64(): string;
  setBuffer(value: Uint8Array | string): DenseNdArrayProto;

  getShapeList(): Array<number>;
  setShapeList(value: Array<number>): DenseNdArrayProto;
  clearShapeList(): DenseNdArrayProto;
  addShape(value: number, index?: number): DenseNdArrayProto;

  getDtype(): string;
  setDtype(value: string): DenseNdArrayProto;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DenseNdArrayProto.AsObject;
  static toObject(includeInstance: boolean, msg: DenseNdArrayProto): DenseNdArrayProto.AsObject;
  static serializeBinaryToWriter(message: DenseNdArrayProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DenseNdArrayProto;
  static deserializeBinaryFromReader(message: DenseNdArrayProto, reader: jspb.BinaryReader): DenseNdArrayProto;
}

export namespace DenseNdArrayProto {
  export type AsObject = {
    buffer: Uint8Array | string,
    shapeList: Array<number>,
    dtype: string,
  }
}

export class DocProto extends jspb.Message {
  getId(): string;
  setId(value: string): DocProto;

  getBuffer(): Uint8Array | string;
  getBuffer_asU8(): Uint8Array;
  getBuffer_asB64(): string;
  setBuffer(value: Uint8Array | string): DocProto;

  getText(): string;
  setText(value: string): DocProto;

  getDtype(): string;
  setDtype(value: string): DocProto;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DocProto.AsObject;
  static toObject(includeInstance: boolean, msg: DocProto): DocProto.AsObject;
  static serializeBinaryToWriter(message: DocProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DocProto;
  static deserializeBinaryFromReader(message: DocProto, reader: jspb.BinaryReader): DocProto;
}

export namespace DocProto {
  export type AsObject = {
    id: string,
    buffer: Uint8Array | string,
    text: string,
    dtype: string,
  }
}

export class DocArrayProto extends jspb.Message {
  getDocsList(): Array<DocProto>;
  setDocsList(value: Array<DocProto>): DocArrayProto;
  clearDocsList(): DocArrayProto;
  addDocs(value?: DocProto, index?: number): DocProto;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DocArrayProto.AsObject;
  static toObject(includeInstance: boolean, msg: DocArrayProto): DocArrayProto.AsObject;
  static serializeBinaryToWriter(message: DocArrayProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DocArrayProto;
  static deserializeBinaryFromReader(message: DocArrayProto, reader: jspb.BinaryReader): DocArrayProto;
}

export namespace DocArrayProto {
  export type AsObject = {
    docsList: Array<DocProto.AsObject>,
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

