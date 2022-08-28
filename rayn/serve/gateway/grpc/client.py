from rayn.proto.python import sparray_pb2 as pb2
from rayn.proto.python import sparray_pb2_grpc as pb2_grpc
from concurrent import futures
import json
import logging
import random
import grpc
import time


def read_route_guide_database():
    """Reads the route guide database.
  Returns:
    The full contents of the route guide database as a sequence of
      pb2.Features.
  """
    feature_list = []
    with open("route_guide_db.json") as route_guide_db_file:
        for item in json.load(route_guide_db_file):
            feature = pb2.Feature(
                name=item["name"],
                location=pb2.Point(
                    latitude=item["location"]["latitude"],
                    longitude=item["location"]["longitude"]))
            feature_list.append(feature)
    return feature_list


def make_route_note(message, latitude, longitude):
    return pb2.RouteNote(
        message=message,
        location=pb2.Point(latitude=latitude, longitude=longitude))


def guide_get_one_feature(stub, point):
    feature = stub.GetFeature(point)
    if not feature.location:
        print("Server returned incomplete feature")
        return

    if feature.name:
        print("Feature called %s at %s" % (feature.name, feature.location))
    else:
        print("Found no feature at %s" % feature.location)


def guide_get_feature(stub):
    guide_get_one_feature(
        stub, pb2.Point(latitude=409146138, longitude=-746188906))
    # guide_get_one_feature(stub, pb2.Point(latitude=0, longitude=0))


def guide_list_features(stub):
    rectangle = pb2.Rectangle(
        lo=pb2.Point(latitude=400000000, longitude=-750000000),
        hi=pb2.Point(latitude=420000000, longitude=-730000000))
    print("Looking for features between 40, -75 and 42, -73")

    features = stub.ListFeatures(rectangle)

    for feature in features:
        print("Feature called %s at %s" % (feature.name, feature.location))


def generate_route(feature_list):
    for _ in range(0, 10):
        random_feature = feature_list[random.randint(0, len(feature_list) - 1)]
        print("Visiting point %s" % random_feature.location)
        yield random_feature.location


def guide_record_route(stub):
    feature_list = read_route_guide_database()

    route_iterator = generate_route(feature_list)
    route_summary = stub.RecordRoute(route_iterator)
    print("Finished trip with %s points " % route_summary.point_count)
    print("Passed %s features " % route_summary.feature_count)
    print("Travelled %s meters " % route_summary.distance)
    print("It took %s seconds " % route_summary.elapsed_time)


def generate_messages():
    messages = [
        make_route_note("First message", 0, 0),
        make_route_note("Second message", 0, 1),
        make_route_note("Third message", 1, 0),
        make_route_note("Fourth message", 0, 0),
        make_route_note("Fifth message", 1, 0),
    ]
    for msg in messages:
        print("Sending %s at %s" % (msg.message, msg.location))
        yield msg


def guide_route_chat(stub):
    responses = stub.RouteChat(generate_messages())
    for response in responses:
        print("Received message %s at %s" %
              (response.message, response.location))


def interactive_stream_data(stub):
    def get_iter():
        messages = [
            pb2.StreamFile(idx=i + 1, total=10, ) for i in range(10)
        ]
        for msg in messages:
            # time.sleep(0.01)
            print(f"Sending big file id: {msg.idx}")
            yield msg

    responses = stub.GetStreamToStream(get_iter())
    for response in responses:
        print(f"received:", type(response))
        print(response)


def post_single_get_stream(stub: pb2_grpc.SparrayServiceStub):
    data = b"0123456789"
    responses = stub.GetSingleToStream(
        pb2.SingleBigFile(
            buffer=data,
            dtype="bytes"
        )
    )
    for resp in responses:
        print(f"received:", type(resp))
        print(resp)


def run():
    # NOTE(gRPC Python Team): .close() is possible on a channel and should be
    # used in circumstances in which the with statement does not fit the needs
    # of the code.
    with grpc.insecure_channel('localhost:50051') as channel:
        stub = pb2_grpc.SparrayServiceStub(channel)
        # print("-------------- GetFeature --------------")
        # guide_get_feature(stub)
        # print("-------------- ListFeatures --------------")
        # guide_list_features(stub)
        # print("-------------- RecordRoute --------------")
        # guide_record_route(stub)
        # print("-------------- RouteChat --------------")
        # guide_route_chat(stub)

        print("-------------- StreamToStreamFile --------------")
        interactive_stream_data(stub)
        print("-------------- SimgleToStreamFile --------------")
        post_single_get_stream(stub)


if __name__ == '__main__':
    logging.basicConfig()
    run()
