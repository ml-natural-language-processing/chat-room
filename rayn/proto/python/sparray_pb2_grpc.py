# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

from . import sparray_pb2 as sparray__pb2


class SparrayServiceStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.GetChat = channel.unary_unary(
                '/sparray.SparrayService/GetChat',
                request_serializer=sparray__pb2.ChatMessage.SerializeToString,
                response_deserializer=sparray__pb2.ChatResponse.FromString,
                )
        self.IdentityMapping = channel.unary_unary(
                '/sparray.SparrayService/IdentityMapping',
                request_serializer=sparray__pb2.ChatProto.SerializeToString,
                response_deserializer=sparray__pb2.ChatProto.FromString,
                )
        self.GetStreamToStream = channel.stream_stream(
                '/sparray.SparrayService/GetStreamToStream',
                request_serializer=sparray__pb2.StreamFile.SerializeToString,
                response_deserializer=sparray__pb2.StreamFile.FromString,
                )
        self.GetSingleToStream = channel.unary_stream(
                '/sparray.SparrayService/GetSingleToStream',
                request_serializer=sparray__pb2.SingleBigFile.SerializeToString,
                response_deserializer=sparray__pb2.StreamFile.FromString,
                )
        self.GetFeature = channel.unary_unary(
                '/sparray.SparrayService/GetFeature',
                request_serializer=sparray__pb2.Point.SerializeToString,
                response_deserializer=sparray__pb2.Feature.FromString,
                )
        self.ListFeatures = channel.unary_stream(
                '/sparray.SparrayService/ListFeatures',
                request_serializer=sparray__pb2.Rectangle.SerializeToString,
                response_deserializer=sparray__pb2.Feature.FromString,
                )
        self.RecordRoute = channel.stream_unary(
                '/sparray.SparrayService/RecordRoute',
                request_serializer=sparray__pb2.Point.SerializeToString,
                response_deserializer=sparray__pb2.RouteSummary.FromString,
                )
        self.RouteChat = channel.stream_stream(
                '/sparray.SparrayService/RouteChat',
                request_serializer=sparray__pb2.RouteNote.SerializeToString,
                response_deserializer=sparray__pb2.RouteNote.FromString,
                )


class SparrayServiceServicer(object):
    """Missing associated documentation comment in .proto file."""

    def GetChat(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def IdentityMapping(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetStreamToStream(self, request_iterator, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetSingleToStream(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetFeature(self, request, context):
        """simple rpc
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def ListFeatures(self, request, context):
        """server2client stream rpc
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def RecordRoute(self, request_iterator, context):
        """client2server stream rpc
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def RouteChat(self, request_iterator, context):
        """stream rpc
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_SparrayServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'GetChat': grpc.unary_unary_rpc_method_handler(
                    servicer.GetChat,
                    request_deserializer=sparray__pb2.ChatMessage.FromString,
                    response_serializer=sparray__pb2.ChatResponse.SerializeToString,
            ),
            'IdentityMapping': grpc.unary_unary_rpc_method_handler(
                    servicer.IdentityMapping,
                    request_deserializer=sparray__pb2.ChatProto.FromString,
                    response_serializer=sparray__pb2.ChatProto.SerializeToString,
            ),
            'GetStreamToStream': grpc.stream_stream_rpc_method_handler(
                    servicer.GetStreamToStream,
                    request_deserializer=sparray__pb2.StreamFile.FromString,
                    response_serializer=sparray__pb2.StreamFile.SerializeToString,
            ),
            'GetSingleToStream': grpc.unary_stream_rpc_method_handler(
                    servicer.GetSingleToStream,
                    request_deserializer=sparray__pb2.SingleBigFile.FromString,
                    response_serializer=sparray__pb2.StreamFile.SerializeToString,
            ),
            'GetFeature': grpc.unary_unary_rpc_method_handler(
                    servicer.GetFeature,
                    request_deserializer=sparray__pb2.Point.FromString,
                    response_serializer=sparray__pb2.Feature.SerializeToString,
            ),
            'ListFeatures': grpc.unary_stream_rpc_method_handler(
                    servicer.ListFeatures,
                    request_deserializer=sparray__pb2.Rectangle.FromString,
                    response_serializer=sparray__pb2.Feature.SerializeToString,
            ),
            'RecordRoute': grpc.stream_unary_rpc_method_handler(
                    servicer.RecordRoute,
                    request_deserializer=sparray__pb2.Point.FromString,
                    response_serializer=sparray__pb2.RouteSummary.SerializeToString,
            ),
            'RouteChat': grpc.stream_stream_rpc_method_handler(
                    servicer.RouteChat,
                    request_deserializer=sparray__pb2.RouteNote.FromString,
                    response_serializer=sparray__pb2.RouteNote.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'sparray.SparrayService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class SparrayService(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def GetChat(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/sparray.SparrayService/GetChat',
            sparray__pb2.ChatMessage.SerializeToString,
            sparray__pb2.ChatResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def IdentityMapping(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/sparray.SparrayService/IdentityMapping',
            sparray__pb2.ChatProto.SerializeToString,
            sparray__pb2.ChatProto.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetStreamToStream(request_iterator,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.stream_stream(request_iterator, target, '/sparray.SparrayService/GetStreamToStream',
            sparray__pb2.StreamFile.SerializeToString,
            sparray__pb2.StreamFile.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetSingleToStream(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_stream(request, target, '/sparray.SparrayService/GetSingleToStream',
            sparray__pb2.SingleBigFile.SerializeToString,
            sparray__pb2.StreamFile.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetFeature(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/sparray.SparrayService/GetFeature',
            sparray__pb2.Point.SerializeToString,
            sparray__pb2.Feature.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def ListFeatures(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_stream(request, target, '/sparray.SparrayService/ListFeatures',
            sparray__pb2.Rectangle.SerializeToString,
            sparray__pb2.Feature.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def RecordRoute(request_iterator,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.stream_unary(request_iterator, target, '/sparray.SparrayService/RecordRoute',
            sparray__pb2.Point.SerializeToString,
            sparray__pb2.RouteSummary.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def RouteChat(request_iterator,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.stream_stream(request_iterator, target, '/sparray.SparrayService/RouteChat',
            sparray__pb2.RouteNote.SerializeToString,
            sparray__pb2.RouteNote.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)
