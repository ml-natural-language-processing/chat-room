import grpc
from rayn.serve.gateway.websocket.manager import WebSocket
from rayn.proto.python import sparray_pb2 as pb2
from rayn.proto.python import sparray_pb2_grpc as pb2_grpc
from concurrent import futures
import time
from concurrent import futures
import logging
import math
import time
from sparrow import rel_to_abs
import grpc
import json


def read_route_guide_database():
    """Reads the route guide database.
  Returns:
    The full contents of the route guide database as a sequence of
      pb2.Features.
  """
    feature_list = []
    with open(rel_to_abs("route_guide_db.json", return_str=True)) as route_guide_db_file:
        for item in json.load(route_guide_db_file):
            feature = pb2.Feature(
                name=item["name"],
                location=pb2.Point(
                    latitude=item["location"]["latitude"],
                    longitude=item["location"]["longitude"]))
            feature_list.append(feature)
    return feature_list


def get_feature(feature_db, point):
    """Returns Feature at given location or None."""
    for feature in feature_db:
        if feature.location == point:
            return feature
    return None


def get_distance(start, end):
    """Distance between two points."""
    coord_factor = 10000000.0
    lat_1 = start.latitude / coord_factor
    lat_2 = end.latitude / coord_factor
    lon_1 = start.longitude / coord_factor
    lon_2 = end.longitude / coord_factor
    lat_rad_1 = math.radians(lat_1)
    lat_rad_2 = math.radians(lat_2)
    delta_lat_rad = math.radians(lat_2 - lat_1)
    delta_lon_rad = math.radians(lon_2 - lon_1)

    # Formula is based on http://mathforum.org/library/drmath/view/51879.html
    a = (pow(math.sin(delta_lat_rad / 2), 2) +
         (math.cos(lat_rad_1) * math.cos(lat_rad_2) *
          pow(math.sin(delta_lon_rad / 2), 2)))
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    R = 6371000
    # metres
    return R * c


class SparrayServicer(pb2_grpc.SparrayServicer):
    """Provides methods that implement functionality of route guide server."""

    def __init__(self):
        self.db = read_route_guide_database()

    def GetFeature(self, request, context):
        feature = get_feature(self.db, request)
        if feature is None:
            return pb2.Feature(name="", location=request)
        else:
            return feature

    def ListFeatures(self, request, context):
        left = min(request.lo.longitude, request.hi.longitude)
        right = max(request.lo.longitude, request.hi.longitude)
        top = max(request.lo.latitude, request.hi.latitude)
        bottom = min(request.lo.latitude, request.hi.latitude)
        for feature in self.db:
            if (left <= feature.location.longitude <= right and
                    bottom <= feature.location.latitude <= top):
                yield feature

    def RecordRoute(self, request_iterator, context):
        point_count = 0
        feature_count = 0
        distance = 0.0
        prev_point = None

        start_time = time.time()
        for point in request_iterator:
            point_count += 1
            if get_feature(self.db, point):
                feature_count += 1
            if prev_point:
                distance += get_distance(prev_point, point)
            prev_point = point

        elapsed_time = time.time() - start_time
        return pb2.RouteSummary(point_count=point_count,
                                feature_count=feature_count,
                                distance=int(distance),
                                elapsed_time=int(elapsed_time))

    def RouteChat(self, request_iterator, context):
        prev_notes = []
        for new_note in request_iterator:
            for prev_note in prev_notes:
                if prev_note.location == new_note.location:
                    yield prev_note
            prev_notes.append(new_note)


def serve(hostname="[::]:50051"):
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    pb2_grpc.add_SparrayServicer_to_server(
        SparrayServicer(), server)
    server.add_insecure_port(hostname)
    server.start()
    server.wait_for_termination()


if __name__ == "__main__":
    logging.basicConfig()
    serve()
