frontend_image = "beidongjiedeguang/chatroom-frontend"
frontend_image_full = $(frontend_image)$(cpu-tag)
backend_cpu_image = "beidongjiedeguang/chatroom-backend"
backend_cpu_image_full = $(backend_cpu_image)$(cpu-tag)
backend_cuda_image = "beidongjiedeguang/chatroom-backend"
backend_cuda_image_full = $(backend_cuda_image)$(cuda-tag)
cpu-tag = ":ubunt2004"
cuda-tag= ":cuda11.3-cudnn8-ubunt2004"

backend_port = 51221# in: 8080
frontend_port = 9090# in: 9090
grpc_port = 50050
currentdir = $(shell pwd)
frontend_container_name = "frontend-container-name"
envoy_container_name = "envoy-container-name"
log ?= ""

start-frontend-dev:
	@echo "======================== Start frontend ========================="
	@docker run -itd --name=$(frontend_container_name) \
	-p $(frontend_port):9090 \
	-v $(currentdir)/web/:/home \
	$(frontend_image_full) /bin/sh -c ./run-frontend.sh
	@echo "Start frontend success. port: $(frontend_port) \n"

log-frontend:
	docker logs -f $(frontend_container_name)

#-p $(backend_port):8080 \
#-p $(grpc_port):$(grpc_port) \

backend_container_name = "backend-container-name"
start-backend-dev:
	@echo "======================== Start backend ========================="
	@python template/build.py
	@docker run -itd --name=$(backend_container_name) \
	--network=host \
	-v $(currentdir):/home \
	-w /home \
	$(backend_cpu_image_full) /bin/sh -c ./run-backend.sh
	@echo "start backend success. backend port: $(backend_port) && grpc port:$(grpc_port) \n"

log-backend:
	docker logs -f $(backend_container_name)

rm-frontend:
	@docker rm -f $(frontend_container_name)

rm-backend:
	@docker rm -f $(backend_container_name)

gen-cert:
	python template/gen_cert.py

start-grpc-server:
	@docker run --name=$(envoy_container_name) -d -v "$(currentdir)"/backend/envoy.yaml:/etc/envoy/envoy.yaml:ro \
    --network=host envoyproxy/envoy:v1.22.0
	@echo "start grpc proxy success. \n"

rm-grpc-server:
	@docker rm -f $(envoy_container_name)

log-grpc:
	@docker -f $(envoy_container_name)

rm: rm-frontend rm-backend rm-grpc-server
start: rm-backend start-backend-dev rm-frontend start-frontend-dev rm-grpc-server start-grpc-server
ifeq ($(firstword $(log)), "f")
	docker logs -f $(frontend_container_name)
else ifeq ($(firstword $(log)), "b")
	docker logs -f $(backend_container_name)
endif
