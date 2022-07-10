ifeq ($(OS),Windows_NT)
 	PLATFORM="Windows"
	MinicondaInstaller="Miniconda3-py39_4.12.0-Windows-x86_64.exe"
else
	ifeq ($(shell uname),Darwin)
  		PLATFORM="MacOS"
#		MinicondaInstaller="Miniconda3-py39_4.12.0-MacOSX-arm64.sh"
#		MinicondaInstaller="Miniconda3-py39_4.12.0-Linux-aarch64.sh"
		MinicondaInstaller="Miniconda3-py39_4.12.0-Linux-x86_64.sh"
 	else
  		PLATFORM="Linux"
		MinicondaInstaller="Miniconda3-py39_4.12.0-Linux-x86_64.sh"
	endif
endif

sources_list = "sources.list"

download: download-sourse-list download-miniconda

clean:
	@rm -rf $(MinicondaInstaller)
	@rm -rf $(sources_list)

download-miniconda:
ifeq ($(wildcard ./$(MinicondaInstaller)), )
	@wget https://repo.anaconda.com/miniconda/$(MinicondaInstaller) -O $(MinicondaInstaller)
else
	@echo "file: $(MinicondaInstaller) already exists, skip download"
endif

download-sourse-list:
ifeq ($(wildcard ./$(sources_list)), )
	@wget https://gist.githubusercontent.com/beidongjiedeguang/ef1f91ef5a0c23438d2c4624188d3335/raw/d745892ed95452264ccb18e9602f7209af63632d/sources.list -O $(sources_list)
else
	@echo "file: sources.list already exists, skip download"
endif

frontend_image = "beidongjiedeguang/chatroom-frontend"
frontend_image_full = $(frontend_image)$(cpu-tag)
backend_cpu_image = "beidongjiedeguang/chatroom-backend"
backend_cpu_image_full = $(backend_cpu_image)$(cpu-tag)
backend_cuda_image = "beidongjiedeguang/chatroom-backend"
backend_cuda_image_full = $(backend_cuda_image)$(cuda-tag)
cpu-tag = ":ubunt2004"
cuda-tag= ":cuda11.3-cudnn8-ubunt2004"

build-frontend:
ifneq ($(shell docker images|grep $(frontend_image)), )
	docker rmi --no-prune $(frontend_image_full)
endif
	docker build -t $(frontend_image_full) -f "./frontend.Dockerfile" ..

build-backend:
ifneq ($(shell docker images|grep $(backend_cpu_image)), )
	docker rmi --no-prune $(backend_cpu_image_full)
endif
	docker build -t $(backend_cpu_image_full) -f "./backend.Dockerfile" .

build-backend-cuda:
ifneq ($(shell docker images|grep $(backend_cuda_image)), )
	docker rmi --no-prune $(backend_cuda_image_full)
endif
	docker build -t $(backend_cuda_image_full) -f "./backend-cuda.Dockerfile" .

clean-dangling-image:
	@docker rmi $$(docker images -q -f dangling=true)