#!/bin/bash

set -e
cd backend/
python websocket_serve.py &
python grpc_serve.py