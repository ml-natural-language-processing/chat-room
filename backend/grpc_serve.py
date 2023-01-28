import sys
sys.path.append("..")
from rayn.serve.gateway.grpc.server import serve
import logging
from sparrow import yaml_load
port = yaml_load('./config.yaml', rel_path=True)['grpc_port_in']

if __name__ == "__main__":
    logging.basicConfig()
    serve(f"[::]:{port}")
