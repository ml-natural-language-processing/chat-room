import sys
sys.path.append("..")
from rayn.serve.gateway.grpc.server import serve
import logging

if __name__ == "__main__":
    logging.basicConfig()
    serve("[::]:50051")
