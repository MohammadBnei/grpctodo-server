/**
 * @fileoverview gRPC-Web generated client stub for server
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')
const proto = {};
proto.server = require('./todo_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.server.TodoServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'binary';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.server.TodoServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'binary';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Empty,
 *   !proto.server.GetItemsResponse>}
 */
const methodDescriptor_TodoService_GetItems = new grpc.web.MethodDescriptor(
  '/server.TodoService/GetItems',
  grpc.web.MethodType.UNARY,
  google_protobuf_empty_pb.Empty,
  proto.server.GetItemsResponse,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.server.GetItemsResponse.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.server.GetItemsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.server.GetItemsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.server.TodoServiceClient.prototype.getItems =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/server.TodoService/GetItems',
      request,
      metadata || {},
      methodDescriptor_TodoService_GetItems,
      callback);
};


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.server.GetItemsResponse>}
 *     Promise that resolves to the response
 */
proto.server.TodoServicePromiseClient.prototype.getItems =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/server.TodoService/GetItems',
      request,
      metadata || {},
      methodDescriptor_TodoService_GetItems);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.server.GetItemRequest,
 *   !proto.server.GetItemResponse>}
 */
const methodDescriptor_TodoService_GetItem = new grpc.web.MethodDescriptor(
  '/server.TodoService/GetItem',
  grpc.web.MethodType.UNARY,
  proto.server.GetItemRequest,
  proto.server.GetItemResponse,
  /**
   * @param {!proto.server.GetItemRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.server.GetItemResponse.deserializeBinary
);


/**
 * @param {!proto.server.GetItemRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.server.GetItemResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.server.GetItemResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.server.TodoServiceClient.prototype.getItem =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/server.TodoService/GetItem',
      request,
      metadata || {},
      methodDescriptor_TodoService_GetItem,
      callback);
};


/**
 * @param {!proto.server.GetItemRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.server.GetItemResponse>}
 *     Promise that resolves to the response
 */
proto.server.TodoServicePromiseClient.prototype.getItem =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/server.TodoService/GetItem',
      request,
      metadata || {},
      methodDescriptor_TodoService_GetItem);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.server.CreateItemRequest,
 *   !proto.server.Item>}
 */
const methodDescriptor_TodoService_CreateItem = new grpc.web.MethodDescriptor(
  '/server.TodoService/CreateItem',
  grpc.web.MethodType.UNARY,
  proto.server.CreateItemRequest,
  proto.server.Item,
  /**
   * @param {!proto.server.CreateItemRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.server.Item.deserializeBinary
);


/**
 * @param {!proto.server.CreateItemRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.server.Item)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.server.Item>|undefined}
 *     The XHR Node Readable Stream
 */
proto.server.TodoServiceClient.prototype.createItem =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/server.TodoService/CreateItem',
      request,
      metadata || {},
      methodDescriptor_TodoService_CreateItem,
      callback);
};


/**
 * @param {!proto.server.CreateItemRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.server.Item>}
 *     Promise that resolves to the response
 */
proto.server.TodoServicePromiseClient.prototype.createItem =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/server.TodoService/CreateItem',
      request,
      metadata || {},
      methodDescriptor_TodoService_CreateItem);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.server.GetItemRequest,
 *   !proto.server.GeneralResponse>}
 */
const methodDescriptor_TodoService_CloseItem = new grpc.web.MethodDescriptor(
  '/server.TodoService/CloseItem',
  grpc.web.MethodType.UNARY,
  proto.server.GetItemRequest,
  proto.server.GeneralResponse,
  /**
   * @param {!proto.server.GetItemRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.server.GeneralResponse.deserializeBinary
);


/**
 * @param {!proto.server.GetItemRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.server.GeneralResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.server.GeneralResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.server.TodoServiceClient.prototype.closeItem =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/server.TodoService/CloseItem',
      request,
      metadata || {},
      methodDescriptor_TodoService_CloseItem,
      callback);
};


/**
 * @param {!proto.server.GetItemRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.server.GeneralResponse>}
 *     Promise that resolves to the response
 */
proto.server.TodoServicePromiseClient.prototype.closeItem =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/server.TodoService/CloseItem',
      request,
      metadata || {},
      methodDescriptor_TodoService_CloseItem);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.server.GetItemRequest,
 *   !proto.server.GeneralResponse>}
 */
const methodDescriptor_TodoService_DeleteItem = new grpc.web.MethodDescriptor(
  '/server.TodoService/DeleteItem',
  grpc.web.MethodType.UNARY,
  proto.server.GetItemRequest,
  proto.server.GeneralResponse,
  /**
   * @param {!proto.server.GetItemRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.server.GeneralResponse.deserializeBinary
);


/**
 * @param {!proto.server.GetItemRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.server.GeneralResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.server.GeneralResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.server.TodoServiceClient.prototype.deleteItem =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/server.TodoService/DeleteItem',
      request,
      metadata || {},
      methodDescriptor_TodoService_DeleteItem,
      callback);
};


/**
 * @param {!proto.server.GetItemRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.server.GeneralResponse>}
 *     Promise that resolves to the response
 */
proto.server.TodoServicePromiseClient.prototype.deleteItem =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/server.TodoService/DeleteItem',
      request,
      metadata || {},
      methodDescriptor_TodoService_DeleteItem);
};


module.exports = proto.server;

