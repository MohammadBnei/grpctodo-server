/**
 * @fileoverview gRPC-Web generated client stub for server
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as todo_pb from './todo_pb';


export class TodoServiceClient {
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

  methodDescriptorGetItems = new grpcWeb.MethodDescriptor(
    '/server.TodoService/GetItems',
    grpcWeb.MethodType.UNARY,
    todo_pb.General,
    todo_pb.GetItemsResponse,
    (request: todo_pb.General) => {
      return request.serializeBinary();
    },
    todo_pb.GetItemsResponse.deserializeBinary
  );

  getItems(
    request: todo_pb.General,
    metadata: grpcWeb.Metadata | null): Promise<todo_pb.GetItemsResponse>;

  getItems(
    request: todo_pb.General,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: todo_pb.GetItemsResponse) => void): grpcWeb.ClientReadableStream<todo_pb.GetItemsResponse>;

  getItems(
    request: todo_pb.General,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: todo_pb.GetItemsResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/server.TodoService/GetItems',
        request,
        metadata || {},
        this.methodDescriptorGetItems,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/server.TodoService/GetItems',
    request,
    metadata || {},
    this.methodDescriptorGetItems);
  }

  methodDescriptorCreateItem = new grpcWeb.MethodDescriptor(
    '/server.TodoService/CreateItem',
    grpcWeb.MethodType.UNARY,
    todo_pb.CreateItemRequest,
    todo_pb.GetItemResponse,
    (request: todo_pb.CreateItemRequest) => {
      return request.serializeBinary();
    },
    todo_pb.GetItemResponse.deserializeBinary
  );

  createItem(
    request: todo_pb.CreateItemRequest,
    metadata: grpcWeb.Metadata | null): Promise<todo_pb.GetItemResponse>;

  createItem(
    request: todo_pb.CreateItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: todo_pb.GetItemResponse) => void): grpcWeb.ClientReadableStream<todo_pb.GetItemResponse>;

  createItem(
    request: todo_pb.CreateItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: todo_pb.GetItemResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/server.TodoService/CreateItem',
        request,
        metadata || {},
        this.methodDescriptorCreateItem,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/server.TodoService/CreateItem',
    request,
    metadata || {},
    this.methodDescriptorCreateItem);
  }

  methodDescriptorCloseItem = new grpcWeb.MethodDescriptor(
    '/server.TodoService/CloseItem',
    grpcWeb.MethodType.UNARY,
    todo_pb.GetItemRequest,
    todo_pb.GetItemResponse,
    (request: todo_pb.GetItemRequest) => {
      return request.serializeBinary();
    },
    todo_pb.GetItemResponse.deserializeBinary
  );

  closeItem(
    request: todo_pb.GetItemRequest,
    metadata: grpcWeb.Metadata | null): Promise<todo_pb.GetItemResponse>;

  closeItem(
    request: todo_pb.GetItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: todo_pb.GetItemResponse) => void): grpcWeb.ClientReadableStream<todo_pb.GetItemResponse>;

  closeItem(
    request: todo_pb.GetItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: todo_pb.GetItemResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/server.TodoService/CloseItem',
        request,
        metadata || {},
        this.methodDescriptorCloseItem,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/server.TodoService/CloseItem',
    request,
    metadata || {},
    this.methodDescriptorCloseItem);
  }

  methodDescriptorDeleteItem = new grpcWeb.MethodDescriptor(
    '/server.TodoService/DeleteItem',
    grpcWeb.MethodType.UNARY,
    todo_pb.GetItemRequest,
    todo_pb.General,
    (request: todo_pb.GetItemRequest) => {
      return request.serializeBinary();
    },
    todo_pb.General.deserializeBinary
  );

  deleteItem(
    request: todo_pb.GetItemRequest,
    metadata: grpcWeb.Metadata | null): Promise<todo_pb.General>;

  deleteItem(
    request: todo_pb.GetItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: todo_pb.General) => void): grpcWeb.ClientReadableStream<todo_pb.General>;

  deleteItem(
    request: todo_pb.GetItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: todo_pb.General) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/server.TodoService/DeleteItem',
        request,
        metadata || {},
        this.methodDescriptorDeleteItem,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/server.TodoService/DeleteItem',
    request,
    metadata || {},
    this.methodDescriptorDeleteItem);
  }

}

