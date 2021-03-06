import * as jspb from 'google-protobuf'

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';


export class GetItemsRequest extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): GetItemsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetItemsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetItemsRequest): GetItemsRequest.AsObject;
  static serializeBinaryToWriter(message: GetItemsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetItemsRequest;
  static deserializeBinaryFromReader(message: GetItemsRequest, reader: jspb.BinaryReader): GetItemsRequest;
}

export namespace GetItemsRequest {
  export type AsObject = {
    message: string,
  }
}

export class GetItemRequest extends jspb.Message {
  getId(): string;
  setId(value: string): GetItemRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetItemRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetItemRequest): GetItemRequest.AsObject;
  static serializeBinaryToWriter(message: GetItemRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetItemRequest;
  static deserializeBinaryFromReader(message: GetItemRequest, reader: jspb.BinaryReader): GetItemRequest;
}

export namespace GetItemRequest {
  export type AsObject = {
    id: string,
  }
}

export class Item extends jspb.Message {
  getId(): string;
  setId(value: string): Item;

  getTitle(): string;
  setTitle(value: string): Item;

  getDescription(): string;
  setDescription(value: string): Item;

  getClosed(): boolean;
  setClosed(value: boolean): Item;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Item.AsObject;
  static toObject(includeInstance: boolean, msg: Item): Item.AsObject;
  static serializeBinaryToWriter(message: Item, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Item;
  static deserializeBinaryFromReader(message: Item, reader: jspb.BinaryReader): Item;
}

export namespace Item {
  export type AsObject = {
    id: string,
    title: string,
    description: string,
    closed: boolean,
  }
}

export class CreateItemRequest extends jspb.Message {
  getItem(): Item | undefined;
  setItem(value?: Item): CreateItemRequest;
  hasItem(): boolean;
  clearItem(): CreateItemRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateItemRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateItemRequest): CreateItemRequest.AsObject;
  static serializeBinaryToWriter(message: CreateItemRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateItemRequest;
  static deserializeBinaryFromReader(message: CreateItemRequest, reader: jspb.BinaryReader): CreateItemRequest;
}

export namespace CreateItemRequest {
  export type AsObject = {
    item?: Item.AsObject,
  }
}

export class GetItemsResponse extends jspb.Message {
  getItemsList(): Array<Item>;
  setItemsList(value: Array<Item>): GetItemsResponse;
  clearItemsList(): GetItemsResponse;
  addItems(value?: Item, index?: number): Item;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetItemsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetItemsResponse): GetItemsResponse.AsObject;
  static serializeBinaryToWriter(message: GetItemsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetItemsResponse;
  static deserializeBinaryFromReader(message: GetItemsResponse, reader: jspb.BinaryReader): GetItemsResponse;
}

export namespace GetItemsResponse {
  export type AsObject = {
    itemsList: Array<Item.AsObject>,
  }
}

export class GetItemResponse extends jspb.Message {
  getItem(): Item | undefined;
  setItem(value?: Item): GetItemResponse;
  hasItem(): boolean;
  clearItem(): GetItemResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetItemResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetItemResponse): GetItemResponse.AsObject;
  static serializeBinaryToWriter(message: GetItemResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetItemResponse;
  static deserializeBinaryFromReader(message: GetItemResponse, reader: jspb.BinaryReader): GetItemResponse;
}

export namespace GetItemResponse {
  export type AsObject = {
    item?: Item.AsObject,
  }
}

export class GeneralResponse extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): GeneralResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GeneralResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GeneralResponse): GeneralResponse.AsObject;
  static serializeBinaryToWriter(message: GeneralResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GeneralResponse;
  static deserializeBinaryFromReader(message: GeneralResponse, reader: jspb.BinaryReader): GeneralResponse;
}

export namespace GeneralResponse {
  export type AsObject = {
    message: string,
  }
}

export class StreamResponse extends jspb.Message {
  getType(): StreamResponse.TYPE;
  setType(value: StreamResponse.TYPE): StreamResponse;

  getItem(): Item | undefined;
  setItem(value?: Item): StreamResponse;
  hasItem(): boolean;
  clearItem(): StreamResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StreamResponse): StreamResponse.AsObject;
  static serializeBinaryToWriter(message: StreamResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StreamResponse;
  static deserializeBinaryFromReader(message: StreamResponse, reader: jspb.BinaryReader): StreamResponse;
}

export namespace StreamResponse {
  export type AsObject = {
    type: StreamResponse.TYPE,
    item?: Item.AsObject,
  }

  export enum TYPE { 
    CREATED = 0,
    DELETED = 1,
    UPDATED = 2,
  }
}

