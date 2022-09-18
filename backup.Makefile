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
grpc_port = 50050 # this is out port.
currentdir = $(shell pwd)
frontend_container = "frontend-container"
envoy_container = "grpc-envoy-container"
log ?= ""

start-frontend-dev:
	@echo "======================== Start frontend ========================="
	@docker run -itd --name=$(frontend_container) \
	-p $(frontend_port):9090 \
	-v $(currentdir)/web/:/home \
	$(frontend_image_full) /bin/sh -c ./run-frontend.sh
	@echo "Start frontend success. port: $(frontend_port) \n"

log-frontend:
	docker logs -f $(frontend_container)

#-p $(backend_port):8080 \
#-p $(grpc_port):$(grpc_port) \

backend_container = "backend-container"
start-backend-dev:
	@echo "======================== Start backend ========================="
	@python template/build.py
	@docker run -itd --name=$(backend_container) \
	--network=host \
	-v $(currentdir):/home \
	-w /home \
	$(backend_cpu_image_full) /bin/sh -c ./run-backend.sh
	@echo "start backend success. backend port: $(backend_port) && grpc port:$(grpc_port) \n"

start-backend-dev-bridge:
	@echo "======================== Start backend ========================="
	@python template/build.py
	@docker run -itd --name=$(backend_container) \
	--network=backend-net \
 	--ip 172.25.0.3 \
	-v $(currentdir):/home \
	-w /home \
	$(backend_cpu_image_full) /bin/sh -c ./run-backend.sh
	@echo "start backend success. backend port: $(backend_port) && grpc port:$(grpc_port) \n"

log-backend:
	docker logs -f $(backend_container)

rm-frontend:
	@docker rm -f $(frontend_container)

rm-backend:
	@docker rm -f $(backend_container)

gen-cert:
	python template/gen_cert.py

start-grpc-server:
	@docker run  -d --name=$(envoy_container) \
	--network=host \
	-v $(currentdir)/backend/envoy.yaml:/etc/envoy/envoy.yaml:ro \
	envoyproxy/envoy:v1.22.0
	@echo "start grpc proxy success. \n"

start-grpc-server-bridge:
	@docker run -d --name=$(envoy_container) \
 	--network="backend-net" \
 	--ip 172.25.0.2 \
	-p 50050:50050 \
 	-v $(currentdir)/backend/envoy.yaml:/etc/envoy/envoy.yaml:ro \
 	envoyproxy/envoy:v1.22.0
	@echo "start grpc proxy success. \n"

rm-grpc-server:
	@docker rm -f $(envoy_container)

log-grpc:
	@docker -f $(envoy_container)

rm: rm-frontend rm-backend rm-grpc-server

# should modified socket_adress from 172.25.0.3 to 0.0.0.0  in envoy.yaml
start: rm start-backend-dev start-frontend-dev start-grpc-server
ifeq ($(firstword $(log)), "f")
	docker logs -f $(frontend_container)
else ifeq ($(firstword $(log)), "b")
	docker logs -f $(backend_container)
endif

# make create-net first
start_option: rm start-grpc-server-bridge start-backend-dev-bridge  start-frontend-dev
ifeq ($(firstword $(log)), "f")
	docker logs -f $(frontend_container)
else ifeq ($(firstword $(log)), "b")
	docker logs -f $(backend_container)
endif

create-net:
	@docker network create --subnet 172.25.0.0/16 backend-net

rm-net:
	@docker network rm backend-net

gitproxy = "https://ghproxy.com/"
install-docker-compose:
	# 已过时： 新版docker 可以直接使用docker compose 执行，无需安装docker-compose
	#sudo curl -L $(gitproxy)https://github.com/docker/compose/releases/download/v2.10.2/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
	sudo curl -L https://download.fastgit.org/docker/compose/releases/download/v2.10.2/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
	sudo chmod +x /usr/local/bin/docker-compose

