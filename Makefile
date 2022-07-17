frontend_image = "beidongjiedeguang/chatroom-frontend"
frontend_image_full = $(frontend_image)$(cpu-tag)
backend_cpu_image = "beidongjiedeguang/chatroom-backend"
backend_cpu_image_full = $(backend_cpu_image)$(cpu-tag)
backend_cuda_image = "beidongjiedeguang/chatroom-backend"
backend_cuda_image_full = $(backend_cuda_image)$(cuda-tag)
cpu-tag = ":ubunt2004"
cuda-tag= ":cuda11.3-cudnn8-ubunt2004"

backend_port = 51221# in: 8080
frontend_port = 51220# in: 9090
currentdir = $(shell pwd)
frontend_container_name = "frontend-container-name"
start-frontend-dev:
	@docker run -itd --name=$(frontend_container_name) \
	-p $(frontend_port):9090 \
	-v $(currentdir)/web/:/home \
	$(frontend_image_full) /bin/sh -c ./run-frontend.sh

restart-frontend-dev:
	@docker restart $(frontend_container_name)

stop-frontend-dev:
	@docker stop $(frontend_container_name)

rm-frontend-dev:
	@docker rm -f $(frontend_container_name)

backend_container_name = "backend-container-name"
start-backend-dev:
	@docker run -itd --name=$(backend_container_name) \
	-p $(backend_port):8080 \
	-v $(currentdir):/home \
	$(backend_cpu_image_full) /bin/sh -c "python backend.py"

restart-backend-dev:
	@docker restart $(backend_container_name)

stop-backend-dev:
	@docker stop $(backend_container_name)

rm-backend-dev:
	@docker rm -f $(backend_container_name)

rm: rm-frontend-dev rm-backend-dev
start: start-backend-dev start-frontend-dev
restart: restart-backend-dev restart-frontend-dev
