cur_dir := $(shell pwd)

gitproxy = "https://ghproxy.com/"
install-docker-compose:
	# 已过时： 新版docker 可以直接使用docker compose 执行，无需安装docker-compose
	#sudo curl -L $(gitproxy)https://github.com/docker/compose/releases/download/v2.10.2/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
	sudo curl -L https://download.fastgit.org/docker/compose/releases/download/v2.10.2/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
	sudo chmod +x /usr/local/bin/docker-compose

restart: stop start

start: # use docker compose
	@python template/build.py
	@docker compose up -d
	docker compose logs -f

stop: 
	@docker compose kill
	@docker rm -f grpc-envoy-container
	@docker rm -f backend-container
	@docker rm -f frontend-container

log:
	docker compose logs -f
