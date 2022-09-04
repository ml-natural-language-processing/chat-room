#!/bin/bash
set -e
# not used
./grpcwebproxy \
  --backend_addr=0.0.0.0:29090 \
  --server_tls_cert_file=../web/apps/chatroom/ca/cert.pem \
  --server_tls_key_file=../web/apps/chatroom/ca/key.pem \
  --server_http_debug_port=9090 \
  --use_websockets
#  --run_tls_server=false \
#  --backend_tls_noverify
#  --server_http_tls_port=19090 \
#  --run_http_server=false \